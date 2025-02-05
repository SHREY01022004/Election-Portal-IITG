import React from "react";
import PropTypes from "prop-types";
import styles from "./YoutubeEmbed.module.css";
import brick from "../../../../components/Nominate/AgendaList/Brick.svg";

const YoutubeEmbed = ({ embedId, key }) => (
  <>
    <div className={`video-responsive ${styles.video_wrapper}`}>
      <iframe
        className={styles.frame}
        width="720"
        height="405"
        src={`https://www.youtube.com/embed/${embedId}?&rel=0&enablejsapi=1`}
        frameBorder="0"
        allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        key={key}
      />
      <div className={`absolute top-0 left-0 ${styles.brick}`}>
        <img src={brick} alt="." />
      </div>
    </div>
  </>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
