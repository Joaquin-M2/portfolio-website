export default class Skill {
  name: string;
  description: JSX.Element;

  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
}
