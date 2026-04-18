import TrackCard from "../../../global/components/TrackCard/TrackCard";
import styles from "./AddedTrack.module.css";

const AddedTrack = ({ track, profile }) => {
    return (
        <div className={styles.addedCard}>
            <TrackCard track={track} squared={true} />
            <div className={styles.addedBy}>
                Dodane przez: <span className={styles.profileName}>{profile.displayName}</span>
            </div>
        </div>
    );
};

export default AddedTrack;