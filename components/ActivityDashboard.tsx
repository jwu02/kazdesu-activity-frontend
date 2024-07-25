"use client"

import { getKeyPresses, getLeftClicks, getMouseMovements, getRightClicks } from "@/lib/actions/activity.actions";
import { useEffect, useState } from "react";
import ActivityChart from "./ActivityChart";
import ActivitySummary from "./ActivitySummary";

const ActivityDashboard = () => {
  const [keyPresses, setKeyPresses] = useState<KeyPress[]>([])
  const [leftClicks, setLeftClicks] = useState<LeftClick[]>([])
  const [rightClicks, setRightClicks] = useState<RightClick[]>([])
  const [mouseMovements, setMouseMovements] = useState<MouseMovement[]>([])

  const fetchKeyPresses = async () => {
    try {
      const data = await getKeyPresses()
      setKeyPresses(data)
    } catch (err) {
      console.log(err)
    }
  }
  
  const fetchLeftClicks = async () => {
    try {
      const data = await getLeftClicks()
      setLeftClicks(data)
    } catch (err) {
      console.log(err)
    }
  }
  
  const fetchRightClicks = async () => {
    try {
      const data = await getRightClicks()
      setRightClicks(data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchMouseMovements = async () => {
    try {
      const data = await getMouseMovements()
      setMouseMovements(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchKeyPresses()
    fetchLeftClicks()
    fetchRightClicks()
    fetchMouseMovements()
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <h1>activity</h1>
      <ActivitySummary
        keyPresses={keyPresses}
        leftClicks={leftClicks}
        rightClicks={rightClicks}
        mouseMovements={mouseMovements}
      />
      <ActivityChart
        keyPresses={keyPresses}
        leftClicks={leftClicks}
        rightClicks={rightClicks}
        mouseMovements={mouseMovements}
      />
    </div>
  )
}

export default ActivityDashboard
