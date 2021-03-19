/* eslint-disable default-case */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
/* eslint-disable react/static-property-placement */
/* eslint-disable max-len */
import React, {
  cloneElement,
  Component,
  createRef,
  CSSProperties,
  isValidElement,
  Key,
  ReactElement,
  ReactNode,
} from "react";
import {
  AUDIO_PRELOAD_ATTRIBUTE,
  MAIN_LAYOUT,
  TIME_FORMAT,
  UI,
} from "./constants";
import CurrentTime from "./CurrentTime";
import Duration from "./Duration";
import ProgressBar from "./ProgressBar";
import { getMainLayoutClassName, throttle } from "./utils";
import PauseIcon from "../icons/PauseIcon";
import PlayIcon from "../icons/PlayIcon";

type CustomUIModule = UI | ReactElement;
type CustomUIModules = Array<CustomUIModule>;
type OnSeek = (audio: HTMLAudioElement, time: number) => Promise<void>;

interface AudioChunk {
  url: string;
  duration: number;
  data?: AudioBuffer;
}

interface MSEPropsObject {
  onSeek: OnSeek;
  onEcrypted?: (e: unknown) => void;
  srcDuration: number;
}

interface PlayerProps {
  /**
   * HTML5 Audio tag autoPlay property
   */
  autoPlay?: boolean;
  /**
   * Whether to play audio after src prop is changed
   */
  autoPlayAfterSrcChange?: boolean;
  /**
   * custom classNames
   */
  className?: string;
  /**
   * The time interval to trigger onListen
   */
  listenInterval?: number;
  progressJumpStep?: number;
  progressJumpSteps?: {
    backward?: number;
    forward?: number;
  };
  volumeJumpStep?: number;
  loop?: boolean;
  muted?: boolean;
  crossOrigin?: string;
  mediaGroup?: string;
  onAbort?: (e: Event) => void;
  onCanPlay?: (e: Event) => void;
  onCanPlayThrough?: (e: Event) => void;
  onEnded?: (e: Event) => void;
  onPlaying?: (e: Event) => void;
  onSeeking?: (e: Event) => void;
  onSeeked?: (e: Event) => void;
  onStalled?: (e: Event) => void;
  onSuspend?: (e: Event) => void;
  onLoadStart?: (e: Event) => void;
  onLoadedMetaData?: (e: Event) => void;
  onLoadedData?: (e: Event) => void;
  onWaiting?: (e: Event) => void;
  onEmptied?: (e: Event) => void;
  onError?: (e: Event) => void;
  onListen?: (e: Event) => void;
  onVolumeChange?: (e: Event) => void;
  onPause?: (e: Event) => void;
  onPlay?: (e: Event) => void;
  onClickPrevious?: (e: React.SyntheticEvent) => void;
  onClickNext?: (e: React.SyntheticEvent) => void;
  onPlayError?: (err: Error) => void;
  mse?: MSEPropsObject;
  /**
   * HTML5 Audio tag preload property
   */
  preload?: AUDIO_PRELOAD_ATTRIBUTE;
  /**
   * Pregress indicator refresh interval
   */
  progressUpdateInterval?: number;
  /**
   * HTML5 Audio tag src property
   */
  src?: string;
  defaultCurrentTime?: ReactNode;
  defaultDuration?: ReactNode;
  volume?: number;
  showJumpControls?: boolean;
  showSkipControls?: boolean;
  showDownloadProgress?: boolean;
  showFilledProgress?: boolean;
  showFilledVolume?: boolean;
  timeFormat?: TIME_FORMAT;
  header?: ReactNode;
  footer?: ReactNode;
  customIcons?: CustomIcons;
  layout?: MAIN_LAYOUT;
  customProgressBarSection?: CustomUIModules;
  customControlsSection?: CustomUIModules;
  customAdditionalControls?: CustomUIModules;
  customVolumeControls?: CustomUIModules;
  children?: ReactNode;
  style?: CSSProperties;
}

interface CustomIcons {
  play?: ReactNode;
  pause?: ReactNode;
  rewind?: ReactNode;
  forward?: ReactNode;
  previous?: ReactNode;
  next?: ReactNode;
  loop?: ReactNode;
  loopOff?: ReactNode;
  volume?: ReactNode;
  volumeMute?: ReactNode;
}

class H5AudioPlayer extends Component<PlayerProps> {
  static defaultProps: PlayerProps = {
    autoPlay: false,
    autoPlayAfterSrcChange: true,
    listenInterval: 1000,
    progressJumpStep: 5000,
    progressJumpSteps: {}, // define when removing progressJumpStep
    volumeJumpStep: 0.1,
    loop: false,
    muted: false,
    preload: "auto",
    progressUpdateInterval: 20,
    defaultCurrentTime: "--:--",
    defaultDuration: "--:--",
    timeFormat: "auto",
    volume: 1,
    className: "",
    showJumpControls: true,
    showSkipControls: false,
    showDownloadProgress: true,
    showFilledProgress: true,
    showFilledVolume: false,
    customIcons: {},
    customProgressBarSection: [UI.CURRENT_TIME, UI.PROGRESS_BAR, UI.DURATION],
    customControlsSection: [
      UI.ADDITIONAL_CONTROLS,
      UI.MAIN_CONTROLS,
      UI.VOLUME_CONTROLS,
    ],
    customAdditionalControls: [UI.LOOP],
    customVolumeControls: [UI.VOLUME],
    layout: "stacked",
  };

  audio = createRef<HTMLAudioElement>();

  progressBar = createRef<HTMLDivElement>();

  container = createRef<HTMLDivElement>();

  lastVolume: number = this.props.volume; // To store the volume before clicking mute button

  listenTracker?: number; // Determine whether onListen event should be called continuously

  volumeAnimationTimer?: number;

  downloadProgressAnimationTimer?: number;

  togglePlay = (e: React.SyntheticEvent): void => {
    e.stopPropagation();
    const audio = this.audio.current;
    if (audio.paused && audio.src) {
      this.playAudioPromise();
    } else if (!audio.paused) {
      audio.pause();
    }
  };

  /**
   * Safely play audio
   *
   * Reference: https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
   */
  playAudioPromise = (): void => {
    this.audio.current
      .play()
      .then(null)
      .catch((err) => {
        const { onPlayError } = this.props;
        onPlayError && onPlayError(new Error(err));
      });
  };

  isPlaying = (): boolean => {
    const audio = this.audio.current;
    if (!audio) return false;

    return !audio.paused && !audio.ended;
  };

  handlePlay = (e: Event): void => {
    this.forceUpdate();
    this.props.onPlay && this.props.onPlay(e);
  };

  handlePause = (e: Event): void => {
    if (!this.audio) return;
    this.forceUpdate();
    this.props.onPause && this.props.onPause(e);
  };

  handleAbort = (e: Event): void => {
    this.props.onAbort && this.props.onAbort(e);
  };

  handleClickVolumeButton = (): void => {
    const audio = this.audio.current;
    if (audio.volume > 0) {
      this.lastVolume = audio.volume;
      audio.volume = 0;
    } else {
      audio.volume = this.lastVolume;
    }
  };

  handleMuteChange = (): void => {
    this.forceUpdate();
  };

  handleClickLoopButton = (): void => {
    this.audio.current.loop = !this.audio.current.loop;
    this.forceUpdate();
  };

  handleClickRewind = (): void => {
    const { progressJumpSteps, progressJumpStep } = this.props;
    const jumpStep = progressJumpSteps.backward || progressJumpStep;
    this.setJumpTime(-jumpStep);
  };

  handleClickForward = (): void => {
    const { progressJumpSteps, progressJumpStep } = this.props;
    const jumpStep = progressJumpSteps.forward || progressJumpStep;
    this.setJumpTime(jumpStep);
  };

  setJumpTime = (time: number): void => {
    const audio = this.audio.current;
    const { duration, currentTime: prevTime } = audio;
    if (!isFinite(duration) || !isFinite(prevTime)) return;
    let currentTime = prevTime + time / 1000;
    if (currentTime < 0) {
      audio.currentTime = 0;
      currentTime = 0;
    } else if (currentTime > duration) {
      audio.currentTime = duration;
      currentTime = duration;
    } else {
      audio.currentTime = currentTime;
    }
  };

  setJumpVolume = (volume: number): void => {
    let newVolume = this.audio.current.volume + volume;
    if (newVolume < 0) newVolume = 0;
    else if (newVolume > 1) newVolume = 1;
    this.audio.current.volume = newVolume;
  };

  handleKeyDown = (e: React.KeyboardEvent): void => {
    switch (e.keyCode) {
      case 32: // Space
        if (
          e.target === this.container.current ||
          e.target === this.progressBar.current
        ) {
          e.preventDefault(); // Prevent scrolling page by pressing Space key
          this.togglePlay(e);
        }
        break;
      case 37: // Left arrow
        this.handleClickRewind();
        break;
      case 39: // Right arrow
        this.handleClickForward();
        break;
      case 38: // Up arrow
        e.preventDefault(); // Prevent scrolling page by pressing arrow key
        this.setJumpVolume(this.props.volumeJumpStep);
        break;
      case 40: // Down arrow
        e.preventDefault(); // Prevent scrolling page by pressing arrow key
        this.setJumpVolume(-this.props.volumeJumpStep);
        break;
      case 76: // L = Loop
        this.handleClickLoopButton();
        break;
      case 77: // M = Mute
        this.handleClickVolumeButton();
        break;
    }
  };

  renderUIModules = (modules: CustomUIModules): Array<ReactElement> => {
    return modules.map((comp, i) => this.renderUIModule(comp, i));
  };

  renderUIModule = (comp: CustomUIModule, key: Key): ReactElement => {
    const {
      defaultCurrentTime,
      progressUpdateInterval,
      showDownloadProgress,
      showFilledProgress,
      defaultDuration,

      timeFormat,
      volume: volumeProp,
      loop: loopProp,
      mse,
    } = this.props;

    switch (comp) {
      case UI.CURRENT_TIME:
        return (
          <div key={key} style={{ margin: "0px 5px" }} id="audio_current-time">
            <CurrentTime
              audio={this.audio.current}
              isLeftTime={false}
              defaultCurrentTime={defaultCurrentTime}
              timeFormat={timeFormat}
            />
            <span className="mx-1">/</span>
            <Duration
              audio={this.audio.current}
              defaultDuration={defaultDuration}
              timeFormat={timeFormat}
            />
          </div>
        );
      case UI.CURRENT_LEFT_TIME:
        return (
          <div
            key={key}
            id="audio_current-left-time"
            className="audio_time audio_current-left-time"
          >
            <CurrentTime
              audio={this.audio.current}
              isLeftTime
              defaultCurrentTime={defaultCurrentTime}
              timeFormat={timeFormat}
            />
          </div>
        );
      case UI.PROGRESS_BAR:
        return (
          <ProgressBar
            key={key}
            ref={this.progressBar}
            audio={this.audio.current}
            progressUpdateInterval={progressUpdateInterval}
            showDownloadProgress={showDownloadProgress}
            showFilledProgress={showFilledProgress}
            srcDuration={mse && mse.srcDuration}
          />
        );

      default:
        if (!isValidElement(comp)) {
          return null;
        }
        return comp.key ? comp : cloneElement(comp as ReactElement, { key });
    }
  };

  componentDidMount(): void {
    // force update to pass this.audio to child components
    this.forceUpdate();
    // audio player object
    const audio = this.audio.current;

    if (this.props.muted) {
      audio.volume = 0;
    } else {
      audio.volume = this.lastVolume;
    }

    audio.addEventListener("error", (e) => {
      this.props.onError && this.props.onError(e);
    });

    // When enough of the file has downloaded to start playing
    audio.addEventListener("canplay", (e) => {
      this.props.onCanPlay && this.props.onCanPlay(e);
    });

    // When enough of the file has downloaded to play the entire file
    audio.addEventListener("canplaythrough", (e) => {
      this.props.onCanPlayThrough && this.props.onCanPlayThrough(e);
    });

    // When audio play starts
    audio.addEventListener("play", this.handlePlay);

    // When unloading the audio player (switching to another src)
    audio.addEventListener("abort", this.handleAbort);

    // When the file has finished playing to the end
    audio.addEventListener("ended", (e) => {
      this.props.onEnded && this.props.onEnded(e);
    });

    // When the media has enough data to start playing, after the play event, but also when recovering from being
    // stalled, when looping media restarts, and after seeked, if it was playing before seeking.
    audio.addEventListener("playing", (e) => {
      this.props.onPlaying && this.props.onPlaying(e);
    });

    // When a seek operation begins
    audio.addEventListener("seeking", (e) => {
      this.props.onSeeking && this.props.onSeeking(e);
    });

    // when a seek operation completes
    audio.addEventListener("seeked", (e) => {
      this.props.onSeeked && this.props.onSeeked(e);
    });

    // when the requested operation (such as playback) is delayed pending the completion of another operation (such as
    // a seek).
    audio.addEventListener("waiting", (e) => {
      this.props.onWaiting && this.props.onWaiting(e);
    });

    // The media has become empty; for example, this event is sent if the media has already been loaded (or partially
    // loaded), and the load() method is called to reload it.
    audio.addEventListener("emptied", (e) => {
      this.props.onEmptied && this.props.onEmptied(e);
    });

    // when the user agent is trying to fetch media data, but data is unexpectedly not forthcoming
    audio.addEventListener("stalled", (e) => {
      this.props.onStalled && this.props.onStalled(e);
    });

    // when loading of the media is suspended; this may happen either because the download has completed or because it
    // has been paused for any other reason
    audio.addEventListener("suspend", (e) => {
      this.props.onSuspend && this.props.onSuspend(e);
    });

    //  when loading of the media begins
    audio.addEventListener("loadstart", (e) => {
      this.props.onLoadStart && this.props.onLoadStart(e);
    });

    // when media's metadata has finished loading; all attributes now contain as much useful information as they're
    // going to
    audio.addEventListener("loadedmetadata", (e) => {
      this.props.onLoadedMetaData && this.props.onLoadedMetaData(e);
    });

    // when the first frame of the media has finished loading.
    audio.addEventListener("loadeddata", (e) => {
      this.props.onLoadedData && this.props.onLoadedData(e);
    });

    // When the user pauses playback
    audio.addEventListener("pause", this.handlePause);

    audio.addEventListener(
      "timeupdate",
      throttle((e) => {
        this.props.onListen && this.props.onListen(e);
      }, this.props.listenInterval)
    );

    audio.addEventListener("volumechange", (e) => {
      this.props.onVolumeChange && this.props.onVolumeChange(e);
    });

    audio.addEventListener("encrypted", (e) => {
      const { mse } = this.props;
      mse && mse.onEcrypted && mse.onEcrypted(e);
    });
  }

  componentDidUpdate(prevProps: PlayerProps): void {
    const { src, autoPlayAfterSrcChange } = this.props;
    if (prevProps.src !== src) {
      if (autoPlayAfterSrcChange) {
        this.playAudioPromise();
      } else {
        // Updating pause icon to play icon
        this.forceUpdate();
      }
    }
  }

  componentWillUnmount(): void {
    const audio = this.audio.current;
    if (audio) {
      audio.removeEventListener("play", this.handlePlay);
      audio.removeEventListener("pause", this.handlePause);
      audio.removeEventListener("abort", this.handleAbort);
      audio.removeAttribute("src");
      audio.load();
    }
  }

  render(): ReactNode {
    const {
      className,
      src,
      loop: loopProp,
      preload,
      autoPlay,
      crossOrigin,
      mediaGroup,
      layout,
      customProgressBarSection,
      children,
      style,
    } = this.props;
    const loop = this.audio.current ? this.audio.current.loop : loopProp;

    return (
      /* We want the container to catch bubbled events */
      /* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */
      <div
        role="group"
        /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
        tabIndex={0}
        aria-label="Audio Player"
        className={`audio_container ${className}`}
        onKeyDown={this.handleKeyDown}
        ref={this.container}
        style={style}
      >
        {/* User can pass <track> through children */}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio
          src={src}
          controls={false}
          loop={loop}
          autoPlay={autoPlay}
          preload={preload}
          crossOrigin={crossOrigin}
          mediaGroup={mediaGroup}
          ref={this.audio}
        >
          {children}
        </audio>

        <div className={`audio_main ${getMainLayoutClassName(layout)}`}>
          <div className="audio_progress-section">
            <button type="button" onClick={this.togglePlay}>
              {this.isPlaying() ? <PauseIcon /> : <PlayIcon />}
            </button>
            {this.renderUIModules(customProgressBarSection)}
          </div>

          {/* <div className="rhap_controls-section">
            {this.renderUIModules(customControlsSection)}
          </div> */}
        </div>
        {/* {footer && <div className="rhap_footer">{footer}</div>} */}
      </div>
    );
  }
}

export default H5AudioPlayer;
export { UI };
