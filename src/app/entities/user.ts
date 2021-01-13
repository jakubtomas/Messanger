export class MyUser {
  public constructor(
    public fName: string,
    public lName: string,
    public login: string,
    public password: string = ''
  ) {}
}
