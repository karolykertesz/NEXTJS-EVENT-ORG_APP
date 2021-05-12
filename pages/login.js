import { Fragment, useRef, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import classes from "../components/UI/ui-modules/login.module.css";
import validate from "validate.js";
import { constraints } from "../helpers/validators/login";
import sender from "../helpers/sender";
import { useRouter } from "next/router";
import { ImGoogle3 } from "react-icons/im";
import { IconContext } from "react-icons";
import googleSign from "../helpers/googlesignin";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [tok, setTok] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const tokenRef = useRef();
  useEffect(() => {
    const getToken = async () => {
      const data = await fetch("/api/users/session");
      const token = await data.json();
      await setTok(token.token);
    };
    return getToken();
  }, []);
  const formSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(undefined);
      const value = await validate(
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        constraints
      );
      if (value !== undefined) {
        setError("Invalid credentials");
        return;
      }
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      if (tok !== undefined || tok !== null) {
        const val = await sender(tok, email, password, router)
          .then((resp) => {
            if (resp.message) {
              setError(resp.message);
            }
          })
          .catch((err) => console.log(err));
      }

      // return;

      return setTok("");
    },
    [tok]
  );

  return (
    <Fragment>
      <Layer>
        <div className={classes.form}>
          <form onSubmit={formSubmit}>
            <div className={classes.control}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" ref={emailRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="password">Passsword</label>
              <input type="password" id="password" ref={passwordRef} />
              <input
                ref={tokenRef}
                type="hidden"
                name="_csrf"
                value={tok ? tok : ""}
              />
            </div>
            <ForMButton>
              <Pi>Login</Pi>
            </ForMButton>
          </form>
          <GoogleButton onClick={() => googleSign()}>
            <IconContext.Provider value={{ color: "white", size: "1.7em" }}>
              <ImGoogle3 />
            </IconContext.Provider>
          </GoogleButton>
          <Error>{error && error}</Error>
        </div>
      </Layer>
    </Fragment>
  );
};
export default Login;

const Layer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 600px;
  margin: 3rem auto;
`;

export const ForMButton = styled.button`
  cursor: pointer;
  background-color: papayawhip;
  border: 1px solid papayawhip;
  border-radius: 6px;
  color: white;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  width: 100%;
  margin-top: 10px;
  padding: 0;
  margin: 0.2rem auto;
`;

export const GoogleButton = styled.button`
  cursor: pointer;
  background-color: red;
  border: 1px solid red;
  border-radius: 6px;
  color: white;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  width: 100%;
  margin-top: 10px;

  margin: 0.2rem auto;
  padding: 12px;
`;

const Pi = styled.p`
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  text-transform: capitalize;
  font-size: 1rem;
  font-weight: bold;
  color: rgb(196, 158, 125);
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  text-transform: uppercase;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 10px;
`;
