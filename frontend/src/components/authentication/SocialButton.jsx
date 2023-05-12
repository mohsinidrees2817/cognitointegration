import { useContext } from "react";
import { Headercontext } from "../Maincontext/HeaderData";

const SocialButton = () => {
  const { googleLoader, setGoogleloader, facebookLoader, setFacebookloader } =
    useContext(Headercontext);

  return (
    <>
      <a href="https://integration2.auth.ap-northeast-1.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=https://cognito-integration.vercel.app/&response_type=TOKEN&client_id=7c3np67ouk443m5mmer7ajmi2&scope=email openid profile">
        <div
          aria-label="Continue with Google"
          className="socialbutton"
          onClick={() => setGoogleloader(true)}
        >
          {!googleLoader ? (
            <>
              <svg
                width="19"
                height="20"
                viewBox="0 0 19 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z"
                  fill="#4285F4"
                />
                <path
                  d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z"
                  fill="#34A853"
                />
                <path
                  d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z"
                  fill="#FBBC05"
                />
                <path
                  d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z"
                  fill="#EB4335"
                />
              </svg>
              <p className="text-sm font-medium ml-4 text-gray-700">
                Continue with Google
              </p>
            </>
          ) : (
            <img
              src="../assets/loaders/loader_black.svg"
              alt=""
              className="loader"
            />
          )}
        </div>
      </a>
      <a href="https://integration2.auth.ap-northeast-1.amazoncognito.com/oauth2/authorize?identity_provider=Facebook&redirect_uri=https://cognito-integration.vercel.app/&response_type=TOKEN&client_id=7c3np67ouk443m5mmer7ajmi2&scope=email openid profile">
        <div
          aria-label="Continue with Facebook"
          className="socialbutton"
          onClick={() => setFacebookloader(true)}
        >
          {!facebookLoader ? (
            <>
              <svg
                fill="#2a4587"
                height="20px"
                width="20px"
                viewBox="0 0 310 310"
                stroke="#2a4587"
              >
                <g id="SVGRepo_bgCarrier" />

                <g id="SVGRepo_tracerCarrier" />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g id="XMLID_834_">
                    {" "}
                    <path
                      id="XMLID_835_"
                      d="M81.703,165.106h33.981V305c0,2.762,2.238,5,5,5h57.616c2.762,0,5-2.238,5-5V165.765h39.064 c2.54,0,4.677-1.906,4.967-4.429l5.933-51.502c0.163-1.417-0.286-2.836-1.234-3.899c-0.949-1.064-2.307-1.673-3.732-1.673h-44.996 V71.978c0-9.732,5.24-14.667,15.576-14.667c1.473,0,29.42,0,29.42,0c2.762,0,5-2.239,5-5V5.037c0-2.762-2.238-5-5-5h-40.545 C187.467,0.023,186.832,0,185.896,0c-7.035,0-31.488,1.381-50.804,19.151c-21.402,19.692-18.427,43.27-17.716,47.358v37.752H81.703 c-2.762,0-5,2.238-5,5v50.844C76.703,162.867,78.941,165.106,81.703,165.106z"
                    />{" "}
                  </g>{" "}
                </g>
              </svg>
              <p className="text-sm font-medium ml-4 text-gray-700">
                Continue with Facebook
              </p>
            </>
          ) : (
            <img
              src="../assets/loaders/loader_black.svg"
              alt=""
              className="w-[20px] mx-auto"
            />
          )}
        </div>
      </a>
    </>
  );
};

export default SocialButton;
