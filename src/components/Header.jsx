import { SignIn, SignOut } from "./Auth";

export default function Header({ action, user }) {
  return (
    <>
      <header>
        <div onClick={action}>Cookbook</div>
        <div>{user ? <SignOut /> : <SignIn />}</div>
      </header>
      <h1>Cookbook</h1>
    </>
  );
}
