import React from 'react';

class AboutPage extends React.Component {
  render() {
    return (
    <div className="container-fluid">
        <div className="jumbotron">
            <h1>About</h1>
            <p>Tidus is built with React, Redux and React Router in ES6.</p>
            <p>This app uses the Spotify API to connect your account and fetch your playlists.</p>
            <p>After you have retrieved your playlists, you can then use this app to look at various
                track attributes Spotify keeps for each one of your songs.</p>
            <p>Click the dashboard link above to try it out!</p>
            <p>Below, some of these attributes are listed along with a brief description pulled straight from the Spotify developer API.</p>
        </div>
        <div className="container text-left">
            <div className="row">
                <h1>Acousticness</h1>
                <p>	A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.</p>
            </div>
            <div className="row">
                <h1>Danceability</h1>
                <p>Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.</p>
            </div>

            <div className="row">
                <h1>Energy</h1>
                <p>Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.</p>
            </div>

            <div className="row">
                <h1>Instrumentalness</h1>
                <p>Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.</p>
            </div>

            <div className="row">
                <h1>Liveness</h1>
                <p>Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.</p>
            </div>

            <div className="row">
                <h1>Loudness</h1>
                <p>The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db</p>
            </div>

            <div className="row">
                <h1>Speechiness</h1>
                <p>	Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.</p>
            </div>

            <div className="row">
                <h1>Tempo</h1>
                <p>The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.</p>
            </div>

            <div className="row">
                <h1>Valence</h1>
                <p>A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).</p>
            </div>
            <div className="row">
                <h1></h1>
                <p></p>
            </div>
        </div>
    </div>
    );
  }
}

export default AboutPage;
