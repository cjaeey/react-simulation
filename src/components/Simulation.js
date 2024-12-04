import React, { useState, useEffect, useRef } from "react";
import Feedback from "./Feedback";
import Question from "./Question";

// Your questions data (still inside the file)
const questionsData = [
  {
    question: "Your team member Dominic hasn't been attending your groups meetings and isn't doing work?",
    options: [
      { text: "Contact Dominic", value: "a" },
      { text: "Ditch Dominic", value: "b" },
      { text: "Tell your boss/teacher", value: "c" },
    ],
    feedback: {
      a: "Excellent choice! ",
      b: "Nice try! Dominic may not be involved as he never felt involved in the first place",
      c: "Good choice, but adding pressure to someone may reflect poorly in the future",
    },
    scores: {
      a: { "Conflict Resolution": 3, "Effective Communication Styles": 3, "Group Cohesion and Motivation": 10 },
      b: { "Conflict Resolution": -5, "Effective Communication Styles": -5, "Group Cohesion and Motivation": -5 },
      c: { "Conflict Resolution": -5, "Effective Communication Styles": -10, "Group Cohesion and Motivation": -5 },
    },
  },
  {
    question: "Your work is due in 2 days, You had 1 week to finish your work. You reach out to your team and your team isn't doing their part of your group work, none of them reply, what will you do?",
    options: [
      { text: "Do the work yourself", value: "a" },
      { text: "Tell a professor/boss", value: "b" },
      { text: "Reach out again and wait", value: "c" },
    ],
    feedback: {
      a: "Good choice, make sure not to make this a regular ",
      b: "Waiting might miss valuable input from quieter members.",
      c: "Ignoring quiet members can make them feel undervalued.",
    },
    scores: {
      a: { "Leadership and Influence": 10, "Group Cohesion and Motivation": 5, "Effective Communication Styles": 5 },
      b: { "Leadership and Influence": 0, "Group Cohesion and Motivation": -5, "Effective Communication Styles": 0 },
      c: { "Leadership and Influence": -5, "Group Cohesion and Motivation": -10, "Effective Communication Styles": -10 },
    },
  },
  {
    question: "Your team is brainstorming ideas for a new project. How do you contribute?",
    options: [
      { text: "Stay quiet and let others talk.", value: "a" },
      { text: "Share a few ideas but avoid elaborating unless asked.", value: "b" },
      { text: "Clearly explain your ideas, using examples to clarify and persuade.", value: "c" },
    ],
    feedback: {
      a: "It's important to contribute actively to foster collaboration.",
      b: "This is a good step, but more active participation would help.",
      c: "Excellent! Clearly sharing ideas enhances teamwork and innovation.",
    },
    scores: {
      a: { "Effective Communication Styles": 2, "Group Cohesion and Motivation": 2 },
      b: { "Effective Communication Styles": 5, "Group Cohesion and Motivation": 5 },
      c: { "Effective Communication Styles": 10, "Group Cohesion and Motivation": 10 },
    },
  },
  {
    question: "Your group needs a leader for a new initiative. What’s your approach?",
    options: [
      { text: "Wait for someone else to volunteer.", value: "a" },
      { text: "Offer to co-lead with someone more experienced.", value: "b" },
      { text: "Confidently volunteer, outlining your vision and plan.", value: "c" },
    ],
    feedback: {
      a: "Leadership requires initiative. Consider stepping up next time.",
      b: "Good choice! Co-leading allows you to learn while contributing.",
      c: "Great decision! Taking charge demonstrates confidence and vision.",
    },
    scores: {
      a: { "Leadership and Influence": 2, "Group Cohesion and Motivation": 2 },
      b: { "Leadership and Influence": 7, "Group Cohesion and Motivation": 5 },
      c: { "Leadership and Influence": 10, "Group Cohesion and Motivation": 10 },
    },
  },
  {
    question: "You’re tasked with deciding which vendor to use for a project. What do you do?",
    options: [
      { text: "Leave the decision to your manager.", value: "a" },
      { text: "Pick the vendor based on past reviews without consulting others.", value: "b" },
      { text: "Analyze costs, consult with the team, and present a well-reasoned choice.", value: "c" },
    ],
    feedback: {
      a: "Delegating up is sometimes necessary, but engagement is better.",
      b: "Considering reviews is a good start, but team input is crucial.",
      c: "Excellent! A well-reasoned choice benefits the entire team.",
    },
    scores: {
      a: { "Decision-Making": 2, "Information Sharing": 2 },
      b: { "Decision-Making": 5, "Information Sharing": 3 },
      c: { "Decision-Making": 10, "Information Sharing": 10 },
    },
  },
  {
    question: "Two coworkers are in a heated disagreement. How do you handle it?",
    options: [
      { text: "Ignore it and hope it resolves itself.", value: "a" },
      { text: "Suggest they discuss their differences privately.", value: "b" },
      { text: "Mediate, ensuring both sides feel heard and finding a solution.", value: "c" },
    ],
    feedback: {
      a: "Avoidance may escalate the conflict.",
      b: "Private discussion can help, but mediation ensures resolution.",
      c: "Great choice! Mediation fosters understanding and resolution.",
    },
    scores: {
      a: { "Conflict Resolution": 2, "Group Cohesion and Motivation": 2, "Leadership and Influence": -4 },
      b: { "Conflict Resolution": 5, "Group Cohesion and Motivation": 5, "Leadership and Influence": 4 },
      c: { "Conflict Resolution": 10, "Group Cohesion and Motivation": 10 },
    },
  },
  {
    question: "A team member feels undervalued. What’s your response?",
    options: [
      { text: "Avoid the issue; it’s not your problem.", value: "a" },
      { text: "Offer a casual word of encouragement.", value: "b" },
      { text: "Acknowledge their contributions publicly and find ways to involve them more.", value: "c" },
    ],
    feedback: {
      a: "Ignoring the issue can lead to disengagement.",
      b: "Encouragement is a good start, but more action is needed.",
      c: "Excellent! Recognition and inclusion build morale and motivation.",
    },
    scores: {
      a: { "Group Cohesion and Motivation": 2, "Effective Communication Styles": 2 },
      b: { "Group Cohesion and Motivation": 5, "Effective Communication Styles": 5 },
      c: { "Group Cohesion and Motivation": 10, "Effective Communication Styles": 10 },
    },
  },
  {
    question: "You’ve discovered a useful resource for a team project. What do you do?",
    options: [
      { text: "Keep it to yourself.", value: "a" },
      { text: "Share it only with close teammates.", value: "b" },
      { text: "Share it with the whole team, explaining its relevance.", value: "c" },
    ],
    feedback: {
      a: "Hoarding information can harm team progress.",
      b: "Selective sharing limits collaboration.",
      c: "Excellent! Sharing resources enhances team effectiveness.",
    },
    scores: {
      a: {
        "Information Sharing": -5,
        "Group Cohesion and Motivation": -2,
        "Leadership and Influence": -3,
        "Effective Communication Styles": -3,
        "Decision-Making": 0,
        "Nonverbal Communication": 0
      },
      b: {
        "Information Sharing": 3,
        "Group Cohesion and Motivation": 2,
        "Leadership and Influence": 1,
        "Effective Communication Styles": 2,
        "Decision-Making": 0,
        "Nonverbal Communication": 0
      },
      c: {
        "Information Sharing": 8,
        "Group Cohesion and Motivation": 5,
        "Leadership and Influence": 5,
        "Effective Communication Styles": 5,
        "Decision-Making": 3,
        "Nonverbal Communication": 1
      }
    }
  },
  {
    question: "A new group member challenges an established norm. How do you respond?",
    options: [
      { text: "Ignore them; it’s not your concern.", value: "a" },
      { text: "Defend the norm without explaining why.", value: "b" },
      { text: "Explain the rationale for the norm, and encourage a respectful discussion.", value: "c" },
    ],
    feedback: {
      a: "Ignoring concerns can breed resentment.",
      b: "Defending without explanation may seem dismissive.",
      c: "Great choice! Respectful discussion fosters understanding.",
    },
    scores: {
      a: {
        "Group Norms and Social Influence": -4,
        "Conflict Resolution": -3,
        "Effective Communication Styles": -3,
        "Leadership and Influence": -2,
        "Cultural Sensitivity in Groups": -2,
        "Problem-Solving and Critical Thinking": -1
      },
      b: {
        "Group Norms and Social Influence": 2,
        "Conflict Resolution": -1,
        "Effective Communication Styles": 1,
        "Leadership and Influence": 1,
        "Cultural Sensitivity in Groups": 0,
        "Problem-Solving and Critical Thinking": 1
      },
      c: {
        "Group Norms and Social Influence": 8,
        "Conflict Resolution": 5,
        "Effective Communication Styles": 5,
        "Leadership and Influence": 5,
        "Cultural Sensitivity in Groups": 3,
        "Problem-Solving and Critical Thinking": 4
      }
    }
  },
  {
    question: "A deadline is at risk due to unexpected challenges. What do you do?",
    options: [
      { text: "Hope the problem resolves itself.", value: "a" },
      { text: "Work extra hours to fix the problem alone.", value: "b" },
      { text: "Identify the root cause, delegate tasks, and revise the plan.", value: "c" },
    ],
    feedback: {
      a: "Hoping for the best may lead to failure.",
      b: "Taking on too much can cause burnout.",
      c: "Great choice! Collaborative problem-solving ensures success.",
    },
    scores: {
      a: {
        "Time Management and Delegation": -5,
        "Problem-Solving and Critical Thinking": -4,
        "Decision-Making": -3,
        "Leadership and Influence": -2,
        "Group Cohesion and Motivation": -2,
        "Conflict Resolution": -1
      },
      b: {
        "Time Management and Delegation": 2,
        "Problem-Solving and Critical Thinking": 2,
        "Decision-Making": 2,
        "Leadership and Influence": -1,
        "Group Cohesion and Motivation": -2,
        "Conflict Resolution": 1
      },
      c: {
        "Time Management and Delegation": 8,
        "Problem-Solving and Critical Thinking": 8,
        "Decision-Making": 5,
        "Leadership and Influence": 5,
        "Group Cohesion and Motivation": 4,
        "Conflict Resolution": 3
      }
    }
  },
  {
    question: "Your workload is overwhelming. How do you handle it?",
    options: [
      { text: "Work late every night to complete everything yourself.", value: "a" },
      { text: "Ask for an extension on some tasks.", value: "b" },
      { text: "Prioritize tasks and delegate what others can handle.", value: "c" },
    ],
    feedback: {
      a: "Overworking can lead to mistakes and burnout. Balance is key.",
      b: "Asking for an extension can help, but managing priorities is better.",
      c: "Excellent! Prioritizing and delegating ensures efficient teamwork.",
    },
    scores: {
      a: {
        "Time Management and Delegation": -5,
        "Leadership and Influence": -3,
        "Group Cohesion and Motivation": -2,
        "Decision-Making": -3,
        "Conflict Resolution": -1,
        "Problem-Solving and Critical Thinking": -1
      },
      b: {
        "Time Management and Delegation": 3,
        "Leadership and Influence": 2,
        "Group Cohesion and Motivation": 1,
        "Decision-Making": 2,
        "Conflict Resolution": 2,
        "Problem-Solving and Critical Thinking": 1
      },
      c: {
        "Time Management and Delegation": 10,
        "Leadership and Influence": 8,
        "Group Cohesion and Motivation": 5,
        "Decision-Making": 7,
        "Conflict Resolution": 5,
        "Problem-Solving and Critical Thinking": 6
      }
    }
  },  
  {
    "question": "A teammate makes a mistake that impacts the project. What do you do?",
    "options": [
      { "text": "Criticize them in front of the team.", "value": "a" },
      { "text": "Ignore it and move on.", "value": "b" },
      { "text": "Discuss the mistake privately and help them fix it.", "value": "c" }
    ],
    "feedback": {
      "a": "Criticism in public can damage relationships and morale.",
      "b": "Ignoring mistakes can lead to repeated errors.",
      "c": "Excellent! Addressing issues privately fosters trust and growth."
    },
    "scores": {
      "a": {
        "Conflict Resolution": -4,
        "Effective Communication Styles": -3,
        "Leadership and Influence": -2,
        "Group Cohesion and Motivation": -3
      },
      "b": {
        "Conflict Resolution": 0,
        "Effective Communication Styles": 2,
        "Leadership and Influence": 1,
        "Group Cohesion and Motivation": 1
      },
      "c": {
        "Conflict Resolution": 8,
        "Effective Communication Styles": 5,
        "Leadership and Influence": 5,
        "Group Cohesion and Motivation": 5
      }
    }
  },
  {
    "question": "Your team is struggling with low morale. How do you address it?",
    "options": [
      { "text": "Push everyone to work harder.", "value": "a" },
      { "text": "Organize a team-building activity.", "value": "b" },
      { "text": "Have an open discussion to identify and address concerns.", "value": "c" }
    ],
    "feedback": {
      "a": "Pushing harder can worsen morale.",
      "b": "Team-building is helpful but addressing concerns is more effective.",
      "c": "Great choice! Open discussions improve morale and trust."
    },
    "scores": {
      "a": {
        "Group Cohesion and Motivation": -3,
        "Leadership and Influence": -2,
        "Conflict Resolution": -1
      },
      "b": {
        "Group Cohesion and Motivation": 4,
        "Leadership and Influence": 3,
        "Conflict Resolution": 2
      },
      "c": {
        "Group Cohesion and Motivation": 8,
        "Leadership and Influence": 7,
        "Conflict Resolution": 6
      }
    }
  },
  {
    "question": "Your team misses a deadline. How do you react?",
    "options": [
      { "text": "Blame the team for poor performance.", "value": "a" },
      { "text": "Analyze what went wrong and share lessons learned.", "value": "b" },
      { "text": "Motivate the team to improve and refocus on the next deadline.", "value": "c" }
    ],
    "feedback": {
      "a": "Blame creates a negative atmosphere and reduces motivation.",
      "b": "Analyzing mistakes is helpful, but motivation is key to moving forward.",
      "c": "Excellent! Motivation and learning ensure future success."
    },
    "scores": {
      "a": {
        "Leadership and Influence": -5,
        "Group Cohesion and Motivation": -3,
        "Conflict Resolution": -2
      },
      "b": {
        "Leadership and Influence": 4,
        "Group Cohesion and Motivation": 2,
        "Conflict Resolution": 2
      },
      "c": {
        "Leadership and Influence": 8,
        "Group Cohesion and Motivation": 6,
        "Conflict Resolution": 5
      }
    }
  },
  {
    "question": "A teammate has a great idea that challenges your approach. How do you respond?",
    "options": [
      { "text": "Reject it without discussion.", "value": "a" },
      { "text": "Consider it but stick to your original plan.", "value": "b" },
      { "text": "Encourage them to explain their idea and discuss it with the team.", "value": "c" }
    ],
    "feedback": {
      "a": "Rejecting ideas without discussion stifles creativity.",
      "b": "Considering ideas is good, but collaboration is better.",
      "c": "Great choice! Encouraging discussion fosters innovation and teamwork."
    },
    "scores": {
      "a": {
        "Effective Communication Styles": -4,
        "Leadership and Influence": -2,
        "Problem-Solving and Critical Thinking": -1
      },
      "b": {
        "Effective Communication Styles": 2,
        "Leadership and Influence": 3,
        "Problem-Solving and Critical Thinking": 2
      },
      "c": {
        "Effective Communication Styles": 8,
        "Leadership and Influence": 6,
        "Problem-Solving and Critical Thinking": 5
      }
    }
  },
  {
    question: "A member of your team is fighting with another member. Paul, your friend tells them to stop fighting, what will you do?",
    options: [
      { text: "Agree with paul and point at your group members", value: "a" },
      { text: "Agree with Paul, however resolve the conflict and determine a mutual agreement.", value: "b" },
      { text: "Encourage your team members that they will get along", value: "c" },
    ],
    feedback: {
      a: "You push the problem away rather than confronting it, and pointing only makes them feel attacked.",
      b: "Good choice, you prevent future problems as well as solving the issue at hand.",
      c: "You push the problem away signaling false hope, jeopardizing trust.",
    },
    scores: {
      a: { "Effective Communication Styles": 2, "Nonverbal Communication": -4},
      b: { "Effective Communication Styles": 5 },
      c: { "Effective Communication Styles": 10 },
    },
  },
  {
    question: "A member of your group has missed multiple deadlines for their tasks. The group is beginning to feel frustrated. What will you do?",
    options: [
      { text: "Confront the member in front of everyone during the meeting.", value: "a" },
      { text: "Speak privately with the member to understand their reasons and offer support.", value: "b" },
      { text: "Assign their tasks to someone else without informing them.", value: "c" },
    ],
    feedback: {
      a: "Public confrontation may humiliate the member and damage group trust.",
      b: "A balanced approach that maintains group harmony and encourages responsibility.",
      c: "Excluding the member without communication fosters resentment and poor group dynamics.",
    },
    scores: {
      a: { "Conflict Resolution": -4, "Leadership and Influence": -5, "Group Cohesion and Motivation": -6 },
      b: { "Conflict Resolution": 10, "Leadership and Influence": 8, "Effective Communication Styles": 6, "Cultural Sensitivity in Groups": 2},
      c: { "Decision-Making": -3, "Group Cohesion and Motivation": -8, "Information Sharing": -4, "Cultural Sensitivity in Groups": -2},
    },
  },
  {
    question: "Your team struggles to meet deadlines due to poor task delegation. What will you do?",
    options: [
      { text: "Take on most of the tasks yourself to ensure they get done.", value: "a" },
      { text: "Create a clear task assignment plan and review it with the team.", value: "b" },
      { text: "Allow the team to continue working as they are to avoid conflict.", value: "c" },
    ],
    feedback: {
      a: "While admirable, this choice can lead to burnout and reduce team productivity.",
      b: "Encourages shared responsibility and improves time management.",
      c: "Avoiding conflict risks missed deadlines and team inefficiency.",
    },
    scores: {
      a: { "Time Management and Delegation": -5, "Leadership and Influence": 3, "Group Cohesion and Motivation": -4 },
      b: { "Time Management and Delegation": 10, "Leadership and Influence": 9, "Problem-Solving and Critical Thinking": 8 },
      c: { "Time Management and Delegation": -8, "Conflict Resolution": -5, "Effective Communication Styles": -6 },
    },
  },
  {
    question: "A disagreement arises over the best approach to solve a problem. What will you do?",
    options: [
      { text: "Allow the loudest member to decide to avoid further disagreement.", value: "a" },
      { text: "Facilitate a discussion to explore everyone's ideas and reach a consensus.", value: "b" },
      { text: "Make the decision yourself without consulting the group.", value: "c" },
    ],
    feedback: {
      a: "This approach neglects valuable input and may lead to resentment.",
      b: "Promotes collaboration and ensures all perspectives are considered.",
      c: "Making unilateral decisions can undermine group cohesion.",
    },
    scores: {
      a: { "Group Norms and Social Influence": -5, "Group Cohesion and Motivation": -7, "Leadership and Influence": -4 },
      b: { "Conflict Resolution": 9, "Effective Communication Styles": 8, "Group Cohesion and Motivation": 7, "Cultural Sensitivity in Groups": 5},
      c: { "Decision-Making": -4, "Leadership and Influence": -6, "Cultural Sensitivity in Groups": -3 },
    },
  },
  {
    question: "A team member frequently interrupts others during discussions. How will you address this behavior?",
    options: [
      { text: "Ignore the behavior to avoid making the person uncomfortable.", value: "a" },
      { text: "Speak with the member privately and explain the importance of letting others share.", value: "b" },
      { text: "Call them out immediately during the discussion.", value: "c" },
    ],
    feedback: {
      a: "Ignoring the issue allows it to persist and disrupt team dynamics.",
      b: "A private conversation maintains respect and encourages positive change.",
      c: "Public confrontation can embarrass the member and escalate tension.",
    },
    scores: {
      a: { "Effective Communication Styles": -6, "Group Norms and Social Influence": -5, "Conflict Resolution": -4 },
      b: { "Leadership and Influence": 8, "Conflict Resolution": 7, "Group Norms and Social Influence": 6 },
      c: { "Conflict Resolution": -5, "Leadership and Influence": -3, "Nonverbal Communication": -4 },
    },
  },
  {
    question: "The group’s progress is slower due to cultural differences in communication styles. What will you do?",
    options: [
      { text: "Adapt your communication style to be inclusive of all members.", value: "a" },
      { text: "Insist on one communication style for everyone to follow.", value: "b" },
      { text: "Avoid addressing the issue to prevent discomfort.", value: "c" },
    ],
    feedback: {
      a: "Shows cultural sensitivity and enhances collaboration.",
      b: "May alienate some members and hinder effective communication.",
      c: "Avoiding the issue perpetuates misunderstandings.",
    },
    scores: {
      a: { "Cultural Sensitivity in Groups": 10, "Effective Communication Styles": 8, "Group Cohesion and Motivation": 6 },
      b: { "Cultural Sensitivity in Groups": -6, "Group Norms and Social Influence": -4, "Effective Communication Styles": -5 },
      c: { "Cultural Sensitivity in Groups": -8, "Conflict Resolution": -5, "Effective Communication Styles": -6 },
    },
  },
  {
    question: "Two members consistently dominate group discussions, leaving others out. What will you do?",
    options: [
      { text: "Ask the quieter members directly for their input during meetings.", value: "a" },
      { text: "Allow the dominant members to continue, as they seem to have good ideas.", value: "b" },
      { text: "Implement a structured turn-taking system to ensure everyone has a chance to speak.", value: "c" },
    ],
    feedback: {
      a: "Encourages balanced participation and values all opinions.",
      b: "Ignores the contributions of quieter members, leading to frustration.",
      c: "Promotes fairness and ensures all voices are heard.",
    },
    scores: {
      a: { "Group Norms and Social Influence": 8, "Leadership and Influence": 7, "Effective Communication Styles": 6 },
      b: { "Group Cohesion and Motivation": -6, "Conflict Resolution": -4, "Information Sharing": -5 },
      c: { "Group Norms and Social Influence": 9, "Effective Communication Styles": 7, "Cultural Sensitivity in Groups": 6 },
    },
  },
  {
    question: "Your group has difficulty agreeing on meeting times due to different schedules. What will you do?",
    options: [
      { text: "Set a fixed time without consulting the group.", value: "a" },
      { text: "Use a scheduling tool to find the best time for everyone.", value: "b" },
      { text: "Leave it up to members to coordinate on their own.", value: "c" },
    ],
    feedback: {
      a: "Disregards group input, leading to potential conflicts.",
      b: "Ensures fairness and promotes group cohesion.",
      c: "Risks disorganization and missed meetings.",
    },
    scores: {
      a: { "Time Management and Delegation": -6, "Leadership and Influence": -4, "Group Cohesion and Motivation": -5 },
      b: { "Time Management and Delegation": 9, "Group Cohesion and Motivation": 8, "Leadership and Influence": 7 },
      c: { "Time Management and Delegation": -7, "Effective Communication Styles": -5, "Group Cohesion and Motivation": -4 },
    },
  },
  {
    question: "Your group is facing a significant workload, and some members are beginning to feel overwhelmed. How will you address this situation?",
    options: [
      { text: "Redistribute tasks evenly to balance the workload.", value: "a" },
      { text: "Encourage members to push through as a challenge.", value: "b" },
      { text: "Reduce the scope of the project to ease the pressure.", value: "c" },
    ],
    feedback: {
      a: "A fair redistribution promotes teamwork and avoids burnout.",
      b: "Motivation is important, but ignoring stress can harm performance.",
      c: "Reducing the scope may affect project quality and goals.",
    },
    scores: {
      a: { "Time Management and Delegation": 8, "Group Cohesion and Motivation": 9, "Problem-Solving and Critical Thinking": 7 },
      b: { "Leadership and Influence": 5, "Group Cohesion and Motivation": -3, "Conflict Resolution": -4 },
      c: { "Problem-Solving and Critical Thinking": -6, "Time Management and Delegation": -4, "Leadership and Influence": -3 },
    },
  },
  {
    question: "During a discussion, one member consistently disagrees with the group’s decisions, causing delays. What will you do?",
    options: [
      { text: "Acknowledge their concerns and look for a compromise.", value: "a" },
      { text: "Ask the member to agree with the majority for the sake of progress.", value: "b" },
      { text: "Ignore the disagreements and proceed with the group’s decision.", value: "c" },
    ],
    feedback: {
      a: "Fosters collaboration and respects all viewpoints.",
      b: "May resolve delays but risks suppressing valuable input.",
      c: "Overlooking dissent can lead to future conflicts.",
    },
    scores: {
      a: { "Conflict Resolution": 10, "Group Cohesion and Motivation": 8, "Effective Communication Styles": 7 },
      b: { "Leadership and Influence": 4, "Conflict Resolution": -3, "Cultural Sensitivity in Groups": -4 },
      c: { "Conflict Resolution": -5, "Group Cohesion and Motivation": -6, "Effective Communication Styles": -4 },
    },
  },
  {
    question: "A member of the team lacks the technical skills needed for their assigned tasks, slowing progress. What is your approach?",
    options: [
      { text: "Offer to mentor them or provide additional resources.", value: "a" },
      { text: "Reassign their tasks to someone more qualified.", value: "b" },
      { text: "Let them continue and hope they improve over time.", value: "c" },
    ],
    feedback: {
      a: "Empowers the member and strengthens the team in the long run.",
      b: "Addresses the immediate issue but may demotivate the member.",
      c: "Lack of action risks project delays and frustration.",
    },
    scores: {
      a: { "Leadership and Influence": 9, "Group Cohesion and Motivation": 8, "Time Management and Delegation": 7 },
      b: { "Time Management and Delegation": 6, "Effective Communication Styles": -2, "Group Norms and Social Influence": -3 },
      c: { "Problem-Solving and Critical Thinking": -7, "Group Cohesion and Motivation": -5, "Leadership and Influence": -4 },
    },
  }
];

const Simulation = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [scores, setScores] = useState({
    "Conflict Resolution": 0,
    "Decision-Making": 0,
    "Effective Communication Styles": 0,
    "Leadership and Influence": 0,
    "Nonverbal Communication": 0,
    "Group Cohesion and Motivation": 0,
    "Information Sharing": 0,
    "Group Norms and Social Influence": 0,
    "Problem-Solving and Critical Thinking": 0,
    "Time Management and Delegation": 0,
    "Cultural Sensitivity in Groups": 0,
  });

  const elementsRef = useRef([]);

  // Function to add elements to the reference array
  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Shuffle questions once when the component mounts
    const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible");
        }
      });
    }, { threshold: 0.5 });

    // Observe each element that needs animation
    elementsRef.current.forEach((el) => observer.observe(el));

    return () => {
      // Clean up the observer when the component unmounts
      observer.disconnect();
    };
  }, []);

  
  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const answerScores = questions[currentQuestionIndex].scores[answer];

    setScores((prevScores) => {
      const newScores = { ...prevScores };
      for (let category in answerScores) {
        newScores[category] += answerScores[category];
      }
      return newScores;
    });

    setTimeout(() => {
      setSelectedAnswer(null);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }, 1500);
  };

  const isLastQuestion = currentQuestionIndex >= questions.length;

  const getDescription = (category, score) => {
    const descriptions = {
      "Conflict Resolution": {
       low: "You may need to work on resolving conflicts more effectively. You avoid conflict or handle it poorly. You escalate situations. Practice active listening and finding common ground.",
       average: "You have a fair understanding of conflict resolution but could benefit from refining your techniques. Specific strategies to practice are avoiding, competing, accommodating, compromising, and collaborating.",
       high: "You excel at resolving conflicts! Keep leveraging your skills to maintain harmony in groups. You’re able to ensure no lingering resentment.",
     },
     "Decision-Making": {
       low: "Your decision-making process could be more structured. Try analyzing situations and considering options thoroughly. You’re indecisive and easily swayed by others’ opinions. You rely too much on others’ judgement.",
       average: "You make decent decisions but could improve by seeking diverse perspectives. You may second-guess or hesitate from time to time, but make reasonable decisions",
       high: "You’re a strong decision-maker! You evaluate long-term consequences and are a strategic thinker. Your ability to choose wisely is a great asset.",
     },
     "Effective Communication Styles": {
       low: "Improving how you communicate could make a big difference. Focus on clarity and active engagement. Consider the needs of the speaker and listener. Say less than necessary, overexplaining or poorly chosen words erode credibility",
       average: "Your communication is effective, but there’s room to become even more impactful. Depending on the context, consider how passive or aggressive you come off so you're able to assert your ideas. You miss opportunities to command attention or persuade effectively",
       high: "Your communication style is excellent! You connect well with others and convey ideas effectively. Your tone is on par with your intentions. You work on the hearts and minds of others, effectively influencing through emotional resonance and clarity",
     },
     "Leadership and Influence": {
       low: "You might need to take more initiative in leadership roles. Lead by example and inspire your team. You hesitate to take charge and lack the vision/ability to inspire others.",
       average: "You show good leadership potential. Keep developing your ability to influence others positively. Understand what the other person wants and associate your needs with theirs.Find out what they want. Don't try to change their minds. Show how what you want helps them get what they want. Be genuine about it.",
       high: "You’re a natural leader! Your influence is empowering your team to achieve more. You command respect and create loyalty through deliberate action and strategy",
     },
     "Nonverbal Communication": {
       low: "Pay attention to your nonverbal cues like body language in relation to your words.",
       average: "Your nonverbal communication is effective but could be more expressive and aligned with your verbal messages.",
       high: "Your nonverbal communication is on point! You’re great at reinforcing your message through body language",
     },
     "Group Cohesion and Motivation": {
       low: "Members of your group feel disconnected and don't feel a sense of belonging. Take initiative and reconnect people by setting an example. Attempt to foster a shared purpose.",
       average: "Your efforts in fostering group cohesion are commendable but could use a little more consistency. Your group is functional, but you aren’t maximizing the potential. In essence, your members may be able to work together but lack unity. Attempt to promote Identity and lead by example.",
       high: "You excel at creating a cohesive and motivated group environment. People are dependent on each other which positions themselves as a central unified force. Keep it up!",
     },
     "Information Sharing": {
       low: "Be proactive in sharing relevant information with your group. You hoard information or share it indiscriminately which fails to build trust. Transparent communication builds trust.",
       average: "Your information-sharing practices are good but could be more detailed and timely. You share information adequately, but may miss chances to use it strategically. One useful method to keep everyone in check is through a Kanban.",
       high: "Your ability to share information effectively is outstanding! Your group appreciates your clarity and openness.",
     },
     "Group Norms and Social Influence": {
       low: "You might need to focus more on understanding and influencing group dynamics. You tend to often alienate yourself.",
       average: "You’re adapting well to group norms. Consider ways to positively influence the group further. You don’t stand out as an influential member as you don’t go above and beyond following group norms.",
       high: "You’re adept at understanding group norms and using them to foster a productive atmosphere.",
     },
     "Problem-Solving and Critical Thinking": {
       low: "Work on developing more structured approaches to solving problems and analyzing challenges. You seem to be overwhelmed by challenges, avoiding addressing issues directly. Neglection sets back opportunities to solve problems.",
       average: "You have a good handle on problem-solving but could sharpen your critical thinking. You may lack creativity or long-term solutions in planning all the way to the end of issues/work at hand.",
       high: "Your problem-solving and critical thinking skills are exceptional! You find effective solutions quickly. You resolve not only problem at hand, but future challenges winning through action over argument.",
     },
     "Time Management and Delegation": {
       low: "Improve how you allocate time and delegate tasks to maximize efficiency in group settings. You poorly organize time and hesitate to delegate. Don’t put your eggs all in one basket.",
       average: "You manage time and delegation fairly well but could streamline your approach further. When asking for help, appeal to other’s self interest, delegating tasks occasionally but not systematically.",
       high: "You excel at managing time and delegating tasks! Your group benefits greatly from your organizational skills. People are dependent on you.",
     },
     "Cultural Sensitivity in Groups": {
       low: "Try to be more mindful of cultural differences and inclusivity in group interactions. There are lots of misunderstandings, try to leverage diversity. Think before you speak!",
       average: "You demonstrate a good level of cultural sensitivity. Keep learning to deepen your understanding by learning how to. You are able to acknowledge cultural differences but struggle to integrate them into your group’s dynamics.",
       high: "Your cultural sensitivity is outstanding! You make everyone feel valued and included. You’re able to foster inclusivity.",
      },
    };

  if (score <= 10) {
    return {
      description: "Low",
      paragraph: descriptions[category].low,
    };
  } else if (score >= 11 && score <= 20) {
    return {
      description: "Average",
      paragraph: descriptions[category].average,
    };
  } else if (score >= 21) {
    return {
      description: "High",
      paragraph: descriptions[category].high,
    };
  }
  return {
    description: "No Score",
    paragraph: "No data available for this category.",
  };
};
  return (
    <div
      style={{
        padding: "30px",
        backgroundImage: "url('./assets/background.svg')", 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        height: "100vh", 
        fontFamily: 'handwrite.woff', 
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
        }}
        className="fade-in"
      >
        <h1>Communication Encounter Simulation</h1>
        <p style={{fontFamily: "Courier New"}}>Welcome to the simulation! You are given scenarios and based on those scenarios you will be able to determine how effective is your communication skills are. Depending on what category you fall into and the severity you will recieve feedback on how to improve. Answer as honest as how you see yourself act in the situations for the best results. You can take the simulation as many times as possible!</p>
      </div>

      {isLastQuestion ? (
        <div ref={addToRefs} className="fade-in">
            <div>
              <h2 style={{ color: "white" }}>Final Scores</h2>
            </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {Object.entries(scores).map(([category, score]) => {
              const { description, paragraph } = getDescription(category, score);
              return (
                <div
                  key={category}
                  style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                  className="fade-in"
                  ref={addToRefs}
                >
                  <h3>{category}</h3>
                  <p>Score: {score}</p>
                  <p><strong>{description} Score:</strong></p>
                  <p>{paragraph}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Question
          question={questions[currentQuestionIndex].question}
          options={questions[currentQuestionIndex].options}
          handleAnswer={handleAnswer}
          isAnswered={!!selectedAnswer}
        />
      )}

      {selectedAnswer && (
        <Feedback
          answer={selectedAnswer}
          feedback={questions[currentQuestionIndex].feedback}
        />
      )}

<div
  ref={addToRefs}
  style={{
    backgroundColor: "#f2f2f2",
    padding: "20px",
    marginTop: "20px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between", // Space out the profile box and gibberish text
    alignItems: "center",
  }}
  className="fade-in"
>
  <div style={{ display: "flex", alignItems: "center" }}>
    <img
      src="https://i.pinimg.com/736x/c9/09/29/c909299b2c2d818b7edd5bf314c4fd60.jpg"
      alt="Slapy"
      style={{
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        objectFit: "cover",
        marginRight: "15px",
      }}
    />
    <div>
      <h4 style={{ margin: 0, fontFamily: "Courier New"}}>Slapy</h4>
      <p style={{ margin: 0 }}>
        <a href="tel:+18667524933" style={{ textDecoration: "none", color: "#000" }}>
        +1 (866) 752-4933
        </a>
      </p>
    </div>
  </div>

  {/* Gibberish Text */}
  <div style={{ marginLeft: "20px", fontFamily: "Courier New", maxWidth: "50%" }}>
    <p style={{ margin: 0 }}>
      Hello! My name is Slapy, I am able to help you practice your communication skills. I'm a mixed bred, slug, capybara, shark, and sloth. I'll be able to simulate a multitude of scenarios you may encounter in a group. Press one and then say hello to start conversation with me!
    </p>
    <p style={{ margin: "10px 0" }}>
      If you have any problems or questions email my creator carlos: escalacarlos86@gmail.com
    </p>
  </div>
</div>

<div
  style={{
    display: "flex", // Enables flexbox layout
    gap: "20px", // Adds spacing between the boxes
    marginTop: "40px", // Adds spacing from the element above
  }}
>
  <div
    ref={addToRefs}
    style={{
      backgroundColor: "#f2f2f2",
      padding: "20px",
      borderRadius: "8px",
      flex: "1", // Makes both boxes take equal width
    }}
    className="fade-in"
  >
    <h3>How I built it</h3>
    <div>
      <img
        src="https://i.pinimg.com/736x/27/5a/96/275a9685357b5dc707a5977152bb3870.jpg"
        alt="pin"
        style={{
          width: "100%",
          height: "360px",
          objectFit: "cover",
        }}
      />
    </div>
  </div>

  <div
    ref={addToRefs}
    style={{
      backgroundColor: "#f2f2f2",
      padding: "20px",
      borderRadius: "8px",
      flex: "1", // Makes both boxes take equal width
    }}
    className="fade-in"
  >
    <h3>Creator Note</h3>
    <div style={{ fontFamily: "Courier New" }}>
      <p>
        During my communications class I we took tests that tested what
        communication style and people we are. I recieved my results but didn't
        really know what to make of it. The word was taught beyond definition,
        but there was a struggle for me to find out how to improve specifically
        as it was very broad. Everyone's communication style or skill had a
        "Pro and Con". As a solution to what seemed as a never ending "Pro and
        Con". I focused my improvements based from various perspectives within
        industries which lead me to think--What industries translate to a
        multitude of experiences?. I tailored the feedback based on psychology
        and business/corporate practices as I found that those industries
        translate to everyday experiences within working of various groups. I
        also had a sufficient source of psychology information as I recently
        took a psychology class so I thought it was perfect. The question I
        surrounded my research on was, "What challenges arise in the process of
        how an individual strengthens communication skills aimed to empower
        others?". In developing this question, I considered what did I need to
        know to be specific towards improvement. In turn, I solved how one is
        capable of greater effective communication.
      </p>
    </div>
  </div>
</div>

      {/* References Box */}
      <div
        ref={addToRefs}
        style={{
          backgroundColor: "#f2f2f2",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "8px",
        }}
        className="fade-in"
      >
        <h3>References</h3>
    <ul style={{ listStyleType: "none", paddingLeft: "0", fontFamily:"Times New Roman" }}>
      <li style={{ marginBottom: "10px", textIndent: "-20px", paddingLeft: "20px" }}>
        Dibra, S. (2014, May 28). How to work well with others: The psychology behind group work. Penn State World Campus Blog. <a href="https://blog.worldcampus.psu.edu/how-to-work-well-with-others-the-psychology-behind-group-work/">https://blog.worldcampus.psu.edu/how-to-work-well-with-others-the-psychology-behind-group-work/</a>
      </li>
      <li style={{ marginBottom: "10px", textIndent: "-20px", paddingLeft: "20px" }}>
        Globočnik Žunac, A., Tišler, P., & Sesar, V. (2022). Sustainable business communication management – Are negative messages to be avoided or just communicated properly? <i>Interdisciplinary Description of Complex Systems, 20</i>(4), 500-513. <a href="https://doi.org/10.7906/indecs.20.4.5">https://doi.org/10.7906/indecs.20.4.5</a>
      </li>
      <li style={{ marginBottom: "10px", textIndent: "-20px", paddingLeft: "20px" }}>
        Griffith, D. M., Efird, C. R., Baskin, M. L., Hooper, M. W., Davis, R. E., & Resnicow, K. (2023). Cultural sensitivity and cultural tailoring: Lessons learned and refinements after two decades of incorporating culture in health communication research. <i>Annual Review of Public Health, 45</i>(1), 195–212. <a href="https://doi.org/10.1146/annurev-publhealth-060722-031158">https://doi.org/10.1146/annurev-publhealth-060722-031158</a>
      </li>
      <li style={{ marginBottom: "10px", textIndent: "-20px", paddingLeft: "20px" }}>
        iEatWebsites. (2021, September 3). How to add custom fonts to your website (HTML and CSS). YouTube. <a href="https://www.youtube.com/watch?v=AAU25Fo4bFY">https://www.youtube.com/watch?v=AAU25Fo4bFY</a>
      </li>
      <li style={{ marginBottom: "10px", textIndent: "-20px", paddingLeft: "20px" }}>
        Kozlowski, S. W. J., & Ilgen, D. R. (2006, December 1). Enhancing the effectiveness of work groups and teams. <i>SagesJournal</i>. <a href="https://journals.sagepub.com/doi/full/10.1111/j.1529-1006.2006.00030.x">https://journals.sagepub.com/doi/full/10.1111/j.1529-1006.2006.00030.x</a>
      </li>
      <li style={{ marginBottom: "10px", textIndent: "-20px", paddingLeft: "20px" }}>
        Moxley, L. (2024, July 22). Nonverbal communication tips for winning meetings. Office of Professional Programs. <a href="https://professionalprograms.umbc.edu/blog/nonverbal-communication-tips-for-winning-meetings/">https://professionalprograms.umbc.edu/blog/nonverbal-communication-tips-for-winning-meetings/</a>
      </li>
      <li style={{ marginBottom: "10px", textIndent: "-20px", paddingLeft: "20px" }}>
        Myers, S. A., & Anderson, C. M. (2008). The fundamentals of small group communication. Thousand Oaks: SAGE Publications, Incorporated.
      </li>
      <li style={{ marginBottom: "10px", textIndent: "-20px", paddingLeft: "20px" }}>
        Rana, R. (2013, February 27). Effective communication in a diverse workplace. <i>Papers.ssrn.com</i>. <a href="sol3/papers.cfm?abstract_id=2225761">sol3/papers.cfm?abstract_id=2225761</a>
      </li>
      <li style={{ marginBottom: "10px", textIndent: "-20px", paddingLeft: "20px" }}>
        Sass, M., & Keil, A. (2024, October 10). Essential communication skills for leaders. CCL. <a href="https://www.ccl.org/articles/leading-effectively-articles/communication-1-idea-3-facts-5-tips">https://www.ccl.org/articles/leading-effectively-articles/communication-1-idea-3-facts-5-tips</a>
      </li>
      <li style={{ marginBottom: "10px", textIndent: "-20px", paddingLeft: "20px" }}>
        Shonk, K. (2024, August 23). What is conflict resolution, and how does it work? <i>PON - Program on Negotiation at Harvard Law School</i>. <a href="https://www.pon.harvard.edu/daily/conflict-resolution/what-is-conflict-resolution-and-how-does-it-work/">https://www.pon.harvard.edu/daily/conflict-resolution/what-is-conflict-resolution-and-how-does-it-work/</a>
      </li>
      <li style={{ marginBottom: "10px", textIndent: "-20px", paddingLeft: "20px" }}>
        Wargo, E. (2011, December 28). The mechanics of choice. <i>Association for Psychological Science - APS</i>. <a href="https://www.psychologicalscience.org/observer/the-mechanics-of-choice">https://www.psychologicalscience.org/observer/the-mechanics-of-choice</a>
      </li>
      <li style={{ marginBottom: "10px", textIndent: "-20px", paddingLeft: "20px" }}>
        Wojtaszek, H., et al. (2024). The role of consistency in verbal and nonverbal communication: Enhancing trust and team effectiveness in management. <i>University of Malta</i>. <a href="https://www.um.edu.mt/library/oar/handle/123456789/127893">https://www.um.edu.mt/library/oar/handle/123456789/127893</a>
      </li>
      <li style={{ marginBottom: "10px", textIndent: "-20px", paddingLeft: "20px" }}>
        Why communication is essential to effective leadership | Penn LPS Online. (2023, August 9). <a href="https://lpsonline.sas.upenn.edu/features/why-communication-essential-effective-leadership">https://lpsonline.sas.upenn.edu/features/why-communication-essential-effective-leadership</a>
      </li>
      <li style={{ marginBottom: "10px", textIndent: "-20px", paddingLeft: "20px" }}>
        “5 Strategies for Conflict Resolution in the Workplace.” (2023, September 7). Business Insights Blog. <a href="https://online.hbs.edu/blog/post/strategies-for-conflict-resolution-in-the-workplace">https://online.hbs.edu/blog/post/strategies-for-conflict-resolution-in-the-workplace</a>
      </li>
    </ul>
      </div>
    </div>
  );
};

export default Simulation;
