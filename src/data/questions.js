const questionsData = [
    {
      question: "How would you handle a disagreement in a small group?",
      options: [
        { text: "Try to resolve the conflict calmly", value: "a" },
        { text: "Avoid addressing the issue to keep the peace", value: "b" },
        { text: "Try to win the argument", value: "c" },
      ],
      feedback: {
        a: "Great job! You handled the conflict calmly and focused on a solution.",
        b: "Nice try! You missed a chance to involve everyone.",
        c: "Good choice, but try to keep the conversation balanced.",
      },
      scores: {
        a: { "Conflict Resolution": 10, "Effective Communication Styles": 5, "Group Cohesion and Motivation": 5 },
        b: { "Conflict Resolution": 0, "Effective Communication Styles": -5, "Group Cohesion and Motivation": -5 },
        c: { "Conflict Resolution": -5, "Effective Communication Styles": -10, "Group Cohesion and Motivation": -5 },
      },
    },
    // Add more questions here...
  ];
  
  export default questionsData;
  