import { useState } from "react";
import Countdown from "react-countdown";

import first from "../../../src/firstplace.png";
import second from "../../../src/secondplace.png";
import third from "../../../src/thirdplace.png";
import slotic from "../../../src/slotic.png";
import roulete21 from "../../../src/roulete21.png";

const Tournament = () => {
  const countDownDate = new Date("Jan 29, 2024 00:00:00").getTime();
  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    return Math.max(0, countDownDate - now);
  };

  const [isExpanded, setExpanded] = useState(false);

  const toggleBlock = () => {
    setExpanded(!isExpanded);
  };
  const [isExpanded2, setExpanded2] = useState(false);

  const toggleBlock2 = () => {
    setExpanded2(!isExpanded2);
  };
  return (
    <div className="tournament">
      <div className="container">
        <div className="slotic">
          <img src={`.${slotic}`} alt={`.${slotic}`} />
        </div>
        <div className="roulete21">
          <img src={`.${roulete21}`} alt={`.${roulete21}`} />
        </div>
        <h2>Weekly Draw</h2>
        <p>
          <span>Ends in:</span>{" "}
          <Countdown
            date={Date.now() + calculateTimeRemaining()}
            renderer={({ days, hours, minutes, seconds, completed }) => {
              if (completed) {
                return <div>Time is Over!</div>;
              } else {
                return (
                  <div>
                    {days}d : {hours}h : {minutes}m : {seconds}s
                  </div>
                );
              }
            }}
          />
        </p>
        <div className="termstournament">
          <h3 className="btnas" onClick={toggleBlock}>
            Draw terms
          </h3>
          <div className={`expanded-block ${isExpanded ? "active" : ""}`}>
            <div>Draw will be held from 01.26.2024 to 01.29.2024.</div>
            <div>
              To participate in the Draw players need to register by our link
              and make a deposit of €20 or an equivalent in one of the partner
              casinos from the Fortune Wheel Brands sector.{" "}
            </div>
            <div>
              Each deposit grants a participant one Draw ticket. The more Draw
              tickets you have, the higher your chances to win. Participants can
              check the quantity of their Draw tickets in the customer support
              chat or on Facebook.
            </div>
            <div>Draw tickets number per participant is unlimited.</div>
            <div>
              Winners will be selected among the players who met these
              conditions by a computerized randomiser tool.
            </div>
            <div>
              There will be 3 prizes total, 1 per each winner. Winners get 30
              free spins for the 1 place, 10 free spins for the 2 place and 5
              free spins for the 3 place.
            </div>
            <h3>Conditions</h3>
            <div>
              1. By participating in this promotion, participants will be deemed
              to have accepted, and agree to be bound by, these terms and
              conditions and the Terms and Conditions of My Award Wallet{" "}
            </div>
            <div>
              2. Participants must be of minimum legal age, stipulated in the
              jurisdiction of their residence under the laws applicable to them.
              It is the participant&#39;s sole responsibility to know whether
              online gambling is legal in his/her country of residence.
            </div>
            <div>
              3. If an act, omission, event or circumstance occurs which is
              beyond the reasonable control of the Promoter and which prevents
              the Promoter from complying with these terms and conditions the
              Promoter will not be liable for any failure to perform or delay in
              performing its obligation.
            </div>
            <div>
              4. Employees of My Award Wallet or any other company associated or
              involved in the promotion of this competition will not be eligible
              to enter this promotion.
            </div>
            <div>
              5. The promotion is limited to one per registered account/person.
              If we find that someone has used more than one account to
              participate, we reserve the right to withhold payment on the
              duplicate account(s).{" "}
            </div>
            <div>Please play responsibly.</div>
            <div>
              If you have any issues or questions about the Draw, please contact
              our customer support.
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="slotic">
          <img src={`.${slotic}`} alt={`.${slotic}`} />
        </div>
        <div className="roulete21">
          <img src={`.${roulete21}`} alt={`.${roulete21}`} />
        </div>
        <h2>Weekly Draw</h2>
        <p>
          <span>Ends in:</span>{" "}
          <Countdown
            date={Date.now() + calculateTimeRemaining()}
            renderer={({ days, hours, minutes, seconds, completed }) => {
              if (completed) {
                return <div>Time is Over!</div>;
              } else {
                return (
                  <div>
                    {days}d : {hours}h : {minutes}m : {seconds}s
                  </div>
                );
              }
            }}
          />
        </p>

        <span className="ourWinners">OUR WINNERS</span>
        <div className="winners">
          <div className="player">
            <div className="player-img">
              <img src={`${first}`} alt={`.${first}`} />
            </div>
            <div className="player-name">First Place</div>
            <div className="player-prize">30 FREE SPINS</div>
          </div>
          <div className="player">
            <div className="player-img">
              <img src={`${second}`} alt={`.${second}`} />
            </div>
            <div className="player-name">Second Place</div>
            <div className="player-prize">10 FREE SPINS</div>
          </div>
          <div className="player">
            <div className="player-img">
              <img src={`${third}`} alt={`.${third}`} />
            </div>
            <div className="player-name">Third Place</div>
            <div className="player-prize">5 FREE SPINS</div>
          </div>
        </div>
        <div className="termstournament">
          <h3 className="btnas" onClick={toggleBlock2}>
            Draw terms
          </h3>
          <div className={`expanded-block ${isExpanded2 ? "active" : ""}`}>
            <div>Draw will be held from 01.26.2024 to 01.29.2024.</div>
            <div>
              To participate in the Draw players need to register by our link
              and make a deposit of €20 or an equivalent in one of the partner
              casinos from the Fortune Wheel Brands sector.{" "}
            </div>
            <div>
              Each deposit grants a participant one Draw ticket. The more Draw
              tickets you have, the higher your chances to win. Participants can
              check the quantity of their Draw tickets in the customer support
              chat or on Facebook.
            </div>
            <div>Draw tickets number per participant is unlimited.</div>
            <div>
              Winners will be selected among the players who met these
              conditions by a computerized randomiser tool.
            </div>
            <div>
              There will be 3 prizes total, 1 per each winner. Winners get 30
              free spins for the 1 place, 10 free spins for the 2 place and 5
              free spins for the 3 place.
            </div>
            <h3>Conditions</h3>
            <div>
              1. By participating in this promotion, participants will be deemed
              to have accepted, and agree to be bound by, these terms and
              conditions and the Terms and Conditions of My Award Wallet{" "}
            </div>
            <div>
              2. Participants must be of minimum legal age, stipulated in the
              jurisdiction of their residence under the laws applicable to them.
              It is the participant&#39;s sole responsibility to know whether
              online gambling is legal in his/her country of residence.
            </div>
            <div>
              3. If an act, omission, event or circumstance occurs which is
              beyond the reasonable control of the Promoter and which prevents
              the Promoter from complying with these terms and conditions the
              Promoter will not be liable for any failure to perform or delay in
              performing its obligation.
            </div>
            <div>
              4. Employees of My Award Wallet or any other company associated or
              involved in the promotion of this competition will not be eligible
              to enter this promotion.
            </div>
            <div>
              5. The promotion is limited to one per registered account/person.
              If we find that someone has used more than one account to
              participate, we reserve the right to withhold payment on the
              duplicate account(s).{" "}
            </div>
            <div>Please play responsibly.</div>
            <div>
              If you have any issues or questions about the Draw, please contact
              our customer support.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tournament;
