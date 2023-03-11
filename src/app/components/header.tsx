import React from "react";
import { GiAlarmClock, GiTomato } from "react-icons/gi";
import Modal from "./Settings";

export default function Header() {
  return (
    <nav className="pt-4 pb-4 flex x justify-between bg-slate-200 bg-opacity-75 mx-auto shadow">
      <div className="flex items-center gap-2 mx-auto cursor-pointer">
        <GiTomato className="text-4xl text-red-400" />
        <h1 className="text-red-400 text-4xl font-bold">Pomodoro Timer</h1>
        <GiTomato className="text-4xl text-red-400" />
      </div>
    </nav>
  );
}
