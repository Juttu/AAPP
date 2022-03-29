import React, {useEffect, useState} from "react";
import {animated, useSpring} from 'react-spring';
import {Button} from "primereact/button";
import {useRecoilState} from "recoil";
import {authState, messageState} from "recoil/atoms";

const list = [
  {
    name: "TATA Motors",
    image: 'https://w7.pngwing.com/pngs/1018/823/png-transparent-tata-motors-logo-car-tamo-racemo-philippines-car-blue-text-logo-thumbnail.png'
  },
  {
    name: "ITC Limited",
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/ITC_Limited_Logo.svg/983px-ITC_Limited_Logo.svg.png'
  },
  {
    name: "SBI",
    image: 'https://pixlok.com/wp-content/uploads/2021/04/SBI-Logo-PNG-768x768.jpg'
  },
  {
    name: "Tesla",
    image: 'http://assets.stickpng.com/images/580b585b2edbce24c47b2cc9.png'
  },
  {
    name: "Netflix",
    image: 'https://www.freepnglogos.com/uploads/netflix-logo-circle-png-5.png'
  },
  {
    name: "RETRY",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSuWuJr0lxph3mVviehH4gq7mndEy5SggKAZBODDechraCX9sFxFR_yxOH6D2ifsY1vmI&usqp=CAU'
  }
];

const offsets = [4 / 6, 3 / 6, 2 / 6, 1 / 6, 0, 5 / 6]

const OFFSET = Math.floor(Math.random() * list.length + 1) / 6;

const map = function (value: number, in_min: number, in_max: number, out_min: number, out_max: number) {
  if (value === 0) {
    return out_min;
  }
  const val = ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  return val - (val % 60);
};

function Reward({onSpinReward}: { onSpinReward: (arg0: string) => void }) {
  const r = 200;
  const cx = 250;
  const cy = 250;
  const [power, setPower] = useState(0);
  const [offsetIdx, setOffsetIdx] = useState(offsets.findIndex(o => o === OFFSET));
  const [acc, setAcc] = useState(0);
  const config = {mass: 50, tension: 200, friction: 200, precision: 0.001};
  const [animateStyles, setAnimateStyles] = useSpring(() => ({
    transform: "rotate(0deg)",
    immediate: false,
  }));

  useEffect(() => {
    const initialAngle = map(acc, 0, 100, 0, 1800);
    const finalAngle = map(acc + power, 0, 100, 0, 1800);
    setAnimateStyles.start({
      from: {transform: `rotate(${-initialAngle}deg)`},
      transform: `rotate(${-finalAngle}deg)`,
      immediate: false,
      config,
      onRest: () => {
        const numRots = ((finalAngle - initialAngle) / 60) % list.length;
        const finalIdx = (offsetIdx + numRots) % list.length;
        onSpinReward(list[finalIdx].name);
        setOffsetIdx(finalIdx);
      }
    });
    setAcc(acc + power);
  }, [power]);

  const renderItems = (numOfItems: any) => {
    const items = [];
    for (let i = 0; i < numOfItems; i++) {
      const xLength = Math.cos(2 * Math.PI * (i / numOfItems + OFFSET)) * (r - 5);
      const yLength = Math.sin(2 * Math.PI * (i / numOfItems + OFFSET)) * (r - 5);
      const txLength =
        Math.cos(2 * Math.PI * ((i + 0.5) / numOfItems + OFFSET)) * (r / 2);
      const tyLength =
        Math.sin(2 * Math.PI * ((i + 0.5) / numOfItems + OFFSET)) * (r / 2);
      items.push(
        <React.Fragment key={i}>
          <line
            stroke="rgb(255,0,0)"
            strokeWidth="2"
            x1={cx + xLength}
            y1={cy + yLength}
            x2={cx}
            y2={cy}
          />
          <image
            x={cx + txLength}
            y={cy + tyLength - 25}
            width="50"
            height="50"
            href={list[i].image}
            transform={`rotate(${((i + 0.5) / numOfItems + OFFSET) * 360} 
                  ${cx + txLength},
                  ${cy + tyLength})`}
          />
        </React.Fragment>
      );
    }
    return items;
  };

  return (
    <div style={{overflowX: "hidden"}}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        className="w-20rem lg:w-30rem"
        style={{transform: 'rotate(90deg)'}}
      >
        <g fill="white" stroke='#60dab3' strokeWidth="10">
          <circle cx="250" cy="250" r={r}/>
        </g>
        <animated.g
          style={{
            transform: animateStyles.transform,
            transformOrigin: "center",
          }}
        >
          {renderItems(list.length)}
        </animated.g>
        <g fill="#61DAFB">
          <circle cx="250" cy="250" r="15"/>
        </g>
        <g fill="black">
          <circle cx="250" cy="250" r="5"/>
        </g>
        <g fill="lime" stroke="purple" strokeWidth="2">
          <polygon points="250,70 230,30 270,30"/>
        </g>
      </svg>
      <PressButton setPower={setPower} style={{height: "20vh"}}/>
    </div>
  );
}

const PressButton = ({setPower}: any) => {

  const [auth] = useRecoilState(authState);
  const [messages, setMessages] = useRecoilState(messageState);

  const onSpinClick = () => {
    if (!auth.isLoggedIn) {
      setMessages([
        ...messages,
        {
          severity: "error",
          summary: "Unauthenticated",
          detail: "Please login to spin the wheel",
        },
      ])
      return;
    }
    if (!auth.isRegistered) {
      setMessages([
        ...messages,
        {
          severity: "error",
          summary: "Not registered",
          detail: "Please register to spin the wheel",
        },
      ])
      return;
    }
    setPower((Math.random() * 100) + 50);
  }

  return (
    <div className="flex flex-column align-items-center mb-2">
      <Button label="Reward me!"
              onClick={onSpinClick}
      />
    </div>
  );
};

export default Reward;