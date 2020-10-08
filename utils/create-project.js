import styles from './create-project.module.scss';

export default class Project {
    constructor(id, image, techs, desc, linkToCode, linkToProject, ...details) {
        this.id = id;
        this.image = image;
        this.technologies = techs;
        this.description = desc;
        this.linkToCode = linkToCode;
        this.linkToProject = linkToProject;
        this.details = this.createDetail(details);
    }

    createDetail(details) {
        let allDetails = []
        for (const detail of details) {
            allDetails.push(<li className={styles.CurtainDetails_Element} key={`${this.id}-${Math.random()}`}>{detail}</li>)
        }
        return allDetails;
    }
}