export type Difficulty = 'easy' | 'medium' | 'hard';

export interface TutorialSection {
  title?: string;
  text: string;
  image?: string; // e.g., '/images/types-of-angles.jpeg'
}

export interface Problem {
  id: string;
  text: string;
  type: 'multiple-choice' | 'numeric';
  options?: string[];
  answer: string;
  difficulty: Difficulty;
  hints: [string, string, string];
  solution: string;
}

export interface KC {
  id: string;
  title: string;
  explanation: string;
  tutorial: TutorialSection[];
  remediation: string;
  problems: {
    easy: Problem[];
    medium: Problem[];
    hard: Problem[];
  };
}

export const domainContent: KC[] = [
  {
    id: "kc1",
    title: "Types of Angles",
    explanation: "Angles are classified based on their measure into acute, right, obtuse, straight, and reflex angles.",
    tutorial: [
      {
        title: "What is an Angle?",
        text: "Imagine you're standing in the middle of a room, pointing straight ahead. Now, without moving your feet, turn your body to point at the door. The amount you turned is an angle! In geometry, an angle is formed when two straight lines (called rays) meet at a single point (called the vertex).",
        image: '/images/types-of-angles.jpeg'
      },
      {
        title: "Story: Learning from a Clock",
        text: "Riya and Arjun were waiting for the school bus. Arjun looked at his watch. 'It's exactly 3:00 PM,' he said. Riya noticed the hands on the watch. 'Look!' she pointed. 'The minute hand is pointing straight up at the 12, and the hour hand is pointing exactly at the 3. They make a perfect L-shape. That's a right angle!' Arjun smiled, 'And at 6:00, they'll make a straight line. Geometry is everywhere!'"
      },
      {
        title: "Classification",
        text: "Angles come in different sizes, just like slices of pizza! \n• Acute: A small slice, less than 90°.\n• Right: A perfect quarter-pizza, exactly 90° (looks like an 'L').\n• Obtuse: A big slice, more than 90° but less than 180°.\n• Straight: Half a pizza, exactly 180° (a flat line).\n• Reflex: More than half a pizza, greater than 180°."
      }
    ],
    remediation: "Think of a door: slightly open → acute, L-shape → right, wide open → obtuse, fully flat → straight, beyond → reflex.",
    problems: {
      easy: [
        {
          id: "kc1-e1",
          text: "Classify an angle of 135°.",
          type: "multiple-choice",
          options: ["Acute", "Right", "Obtuse", "Reflex"],
          answer: "Obtuse",
          difficulty: "easy",
          hints: [
            "Compare 135° with 90° and 180°.",
            "It is greater than 90° but less than 180°.",
            "Angles in this range are obtuse."
          ],
          solution: "135° lies between 90° and 180°, so it is an obtuse angle."
        },
        {
          id: "kc1-e2",
          text: "Classify an angle of 45°.",
          type: "multiple-choice",
          options: ["Acute", "Right", "Obtuse", "Straight"],
          answer: "Acute",
          difficulty: "easy",
          hints: [
            "Compare 45° with 90°.",
            "It is less than 90°.",
            "Angles less than 90° are acute."
          ],
          solution: "45° is less than 90°, so it is acute."
        },
        {
          id: "kc1-e3",
          text: "What type of angle is 180°?",
          type: "multiple-choice",
          options: ["Acute", "Right", "Straight", "Reflex"],
          answer: "Straight",
          difficulty: "easy",
          hints: [
            "Think about a flat line.",
            "A straight angle measures exactly 180°.",
            "So this is a straight angle."
          ],
          solution: "180° is a straight angle."
        }
      ],
      medium: [
        {
          id: "kc1-m1",
          text: "An angle is 30° more than a right angle. What type is it?",
          type: "multiple-choice",
          options: ["Acute", "Right", "Obtuse", "Reflex"],
          answer: "Obtuse",
          difficulty: "medium",
          hints: [
            "A right angle is 90°.",
            "Add 30° to 90°.",
            "120° lies between 90° and 180°."
          ],
          solution: "120° is an obtuse angle."
        },
        {
          id: "kc1-m2",
          text: "Classify (90 + x) if x is acute.",
          type: "multiple-choice",
          options: ["Acute", "Right", "Obtuse", "Straight"],
          answer: "Obtuse",
          difficulty: "medium",
          hints: [
            "x is less than 90°.",
            "90 + x is greater than 90°.",
            "But still less than 180°."
          ],
          solution: "So (90 + x) is always obtuse."
        },
        {
          id: "kc1-m3",
          text: "Which of the following could be a reflex angle?",
          type: "multiple-choice",
          options: ["120°", "180°", "250°", "90°"],
          answer: "250°",
          difficulty: "medium",
          hints: [
            "Reflex angles are greater than 180°.",
            "Check each option.",
            "Only 250° fits."
          ],
          solution: "250° is greater than 180°, so it is reflex."
        }
      ],
      hard: [
        {
          id: "kc1-h1",
          text: "Two angles are in the ratio 2:3 and sum to 180°. Find the smaller angle.",
          type: "numeric",
          answer: "72",
          difficulty: "hard",
          hints: [
            "Let angles be 2x and 3x.",
            "2x + 3x = 180.",
            "Solve for x."
          ],
          solution: "5x = 180 → x = 36 → angles are 72° and 108°."
        },
        {
          id: "kc1-h2",
          text: "Find the smallest (integer) x if (2x + 11) is an obtuse angle between 90° and 180°.",
          type: "numeric",
          answer: "40",
          difficulty: "hard",
          hints: [
            "Set inequality: 90 < 2x + 11 < 180.",
            "Solve both sides.",
            "Find smallest valid x."
          ],
          solution: "2x + 10 > 90 → x > 40; choose valid integer boundary."
        }
      ]
    }
  },
  {
    id: "kc2",
    title: "Complementary and Supplementary Angles",
    explanation: "Complementary angles sum to 90°, while supplementary angles sum to 180°.",
    tutorial: [
      {
        title: "Complementary Angles",
        text: "Meet the 'Complementary Twins'. Whenever they work together, they always give exactly 90% effort. If one twin gives 40%, the other must give 50%. In geometry, two angles are complementary if they add up to exactly 90° (a right angle).",
        image: '/images/complementary.jpeg'
      },
      {
        title: "Supplementary Angles",
        text: "Now meet the 'Supplementary Superheroes'. Their combined power level is always exactly 180. If one hero has a power level of 120, the other must have 60. Two angles are supplementary if they add up to exactly 180° (a straight line).",
        image: '/images/supplementary.jpeg'
      }
    ],
    remediation: "Think: Complement → 90° (corner), Supplement → 180° (straight line).",
    problems: {
      easy: [
        {
          id: "kc2-e1",
          text: "Find the complement of 40°.",
          type: "numeric",
          answer: "50",
          difficulty: "easy",
          hints: [
            "Complementary angles sum to 90°.",
            "40 + x = 90.",
            "x = 50."
          ],
          solution: "90 - 40 = 50°."
        },
        {
          id: "kc2-e2",
          text: "Find the supplement of 120°.",
          type: "numeric",
          answer: "60",
          difficulty: "easy",
          hints: [
            "Supplementary angles sum to 180°.",
            "120 + x = 180.",
            "x = 60."
          ],
          solution: "180 - 120 = 60°."
        }
      ],
      medium: [
        {
          id: "kc2-m1",
          text: "Two supplementary angles are in ratio 1:2. Find them.",
          type: "numeric",
          answer: "60,120",
          difficulty: "medium",
          hints: [
            "Let angles be x and 2x.",
            "x + 2x = 180.",
            "x = 60."
          ],
          solution: "Angles are 60° and 120°."
        },
        {
          id: "kc2-m2",
          text: "Find the complement of 65°.",
          type: "numeric",
          answer: "25",
          difficulty: "medium",
          hints: [
            "Complement sum = 90.",
            "90 - 65.",
            "25°."
          ],
          solution: "25°."
        }
      ],
      hard: [
        {
          id: "kc2-h1",
          text: "An angle is 20° less than its complement. Find it.",
          type: "numeric",
          answer: "35",
          difficulty: "hard",
          hints: [
            "Let angle = x.",
            "x = (90 - x) - 20.",
            "Solve."
          ],
          solution: "x = 35°."
        }
      ]
    }
  },
  {
    id: "kc3",
    title: "Adjacent Angles",
    explanation: "Adjacent angles share a common vertex and arm but do not overlap.",
    tutorial: [
      {
        title: "Definition",
        text: "Think of two houses that share a common wall. They are right next to each other. In geometry, Adjacent Angles are like those houses. They share a common vertex (the corner) and a common arm (the wall), but they don't overlap inside.",
        image: '/images/adjacent.jpeg'
      }
    ],
    remediation: "Think of adjacent angles as neighbours sharing a wall.",
    problems: {
      easy: [
        {
          id: "kc3-e1",
          text: "Angle PQR = 100°. Angle PQS = 35°. Find SQR.",
          type: "numeric",
          answer: "65",
          difficulty: "easy",
          hints: [
            "Whole = sum of parts.",
            "100 = 35 + x.",
            "x = 65."
          ],
          solution: "65°."
        }
      ],
      medium: [
        {
          id: "kc3-m1",
          text: "Do adjacent angles always sum to 180°?",
          type: "multiple-choice",
          options: ["Yes", "No"],
          answer: "No",
          difficulty: "medium",
          hints: [
            "Think definition.",
            "Only linear pair sums 180.",
            "So answer is No."
          ],
          solution: "They can have any sum."
        }
      ],
      hard: [
        {
          id: "kc3-h1",
          text: "Angle AOC = 120°. Bisectors divide it. Find middle angle.",
          type: "numeric",
          answer: "60",
          difficulty: "hard",
          hints: [
            "Bisectors split angles.",
            "Half of 120.",
            "60°."
          ],
          solution: "60°."
        }
      ]
    }
  },
  {
    id: "kc4",
    title: "Linear Pair",
    explanation: "A linear pair is a pair of adjacent angles that sum to 180°.",
    tutorial: [
      {
        title: "Linear Pair Axiom",
        text: "Imagine a straight road. If you draw a line branching off that road, you create two angles. Because the road is perfectly straight (180°), those two adjacent angles MUST add up to 180°. This special duo is called a Linear Pair.",
        image: '/images/linear-pair.jpeg'
      }
    ],
    remediation: "Think of a straight line → 180° total.",
    problems: {
      easy: [
        {
          id: "kc4-e1",
          text: "One angle is 70°. Find the other.",
          type: "numeric",
          answer: "110",
          difficulty: "easy",
          hints: [
            "Sum = 180.",
            "180 - 70.",
            "110."
          ],
          solution: "110°."
        }
      ],
      medium: [
        {
          id: "kc4-m1",
          text: "One angle is 40° more than the other. Find both.",
          type: "numeric",
          answer: "70,110",
          difficulty: "medium",
          hints: [
            "Let x, x+40.",
            "Sum 180.",
            "Solve."
          ],
          solution: "70° and 110°."
        }
      ],
      hard: [
        {
          id: "kc4-h1",
          text: "(3x−10) and (2x+15) form linear pair. Find x.",
          type: "numeric",
          answer: "35",
          difficulty: "hard",
          hints: [
            "Sum = 180.",
            "Solve equation.",
            "x = 35."
          ],
          solution: "x = 35."
        }
      ]
    }
  },
  {
    id: "kc5",
    title: "Vertically Opposite Angles",
    explanation: "Vertically opposite angles are equal when two lines intersect.",
    tutorial: [
      {
        title: "Key Rule",
        text: "Picture a pair of open scissors. The angle between the blades on top is exactly the same as the angle between the handles on the bottom. When two straight lines cross like an 'X', the angles opposite each other are called Vertically Opposite Angles, and they are always equal!",
        image: '/images/vertically-opposite.jpeg'
      }
    ],
    remediation: "Think X-shape → opposite angles equal.",
    problems: {
      easy: [
        {
          id: "kc5-e1",
          text: "One angle is 60°. Find opposite angle.",
          type: "numeric",
          answer: "60",
          difficulty: "easy",
          hints: [
            "Opposite angles equal.",
            "Same value.",
            "60."
          ],
          solution: "60°."
        }
      ],
      medium: [
        {
          id: "kc5-m1",
          text: "One angle is 45°. Find adjacent.",
          type: "numeric",
          answer: "135",
          difficulty: "medium",
          hints: [
            "Linear pair.",
            "180 - 45.",
            "135."
          ],
          solution: "135°."
        }
      ],
      hard: [
        {
          id: "kc5-h1",
          text: "Sum of opposite angles is 130°. Find all.",
          type: "numeric",
          answer: "65,115,65,115",
          difficulty: "hard",
          hints: [
            "Split equally.",
            "x + x = 130.",
            "x = 65."
          ],
          solution: "65° and 115°."
        }
      ]
    }
  },
  {
    id: "kc6",
    title: "Transversals & Corresponding Angles",
    explanation: "A transversal is a line intersecting two or more lines. Corresponding angles are in the same relative position at each intersection. If lines are parallel, these are equal.",
    tutorial: [
      {
        title: "What is a Transversal?",
        text: "Imagine a busy highway with multiple lanes (parallel lines). Now, imagine a train track cutting straight across all those lanes. That train track is a 'Transversal'—a line that intersects two or more other lines.",
        image: '/images/transversal.jpeg'
      },
      {
        title: "Corresponding Angles",
        text: "Think of a multi-story parking garage. If you park in the front-right spot on the 1st floor, and your friend parks in the front-right spot on the 2nd floor, you are in 'Corresponding' positions. If the floors are perfectly parallel, your spots are identical. Similarly, Corresponding Angles are in the exact same relative position at each intersection. If the lines are parallel, these angles are equal.",
        image: '/images/corresponding-angles.jpeg'
      }
    ],
    remediation: "Imagine a ladder over two parallel train tracks. The angles at the same \"corner\" of each track are Corresponding and equal.",
    problems: {
      easy: [
        {
          id: "kc6-e1",
          text: "Parallel lines are cut by a transversal. One angle is 80°. What is its corresponding angle?",
          type: "numeric",
          answer: "80",
          difficulty: "easy",
          hints: [
            "Corresponding angles are equal when lines are parallel.",
            "It must be the same value.",
            "The answer is 80."
          ],
          solution: "Corresponding angles are equal, so it is 80°."
        }
      ],
      medium: [
        {
          id: "kc6-m1",
          text: "Corresponding angles are (3x + 10)° and 100°. Find x if the lines are parallel.",
          type: "numeric",
          answer: "30",
          difficulty: "medium",
          hints: [
            "Set them equal to each other.",
            "3x + 10 = 100.",
            "3x = 90, solve for x."
          ],
          solution: "3x + 10 = 100 implies 3x = 90, so x = 30."
        }
      ],
      hard: [
        {
          id: "kc6-h1",
          text: "A transversal cuts two parallel lines. The bisectors of a pair of corresponding angles are drawn. Are the bisectors parallel?",
          type: "multiple-choice",
          options: ["Yes", "No"],
          answer: "Yes",
          difficulty: "hard",
          hints: [
            "Let the corresponding angles be 2x.",
            "The bisectors create angles of x.",
            "Since the corresponding angles of the bisectors are equal (x=x), they are parallel."
          ],
          solution: "The bisectors form equal corresponding angles, meaning they must be parallel."
        }
      ]
    }
  },
  {
    id: "kc7",
    title: "Alternate Interior & Co-interior Angles",
    explanation: "For parallel lines cut by a transversal, alternate interior angles (Z-shape) are equal, and co-interior angles (C-shape) sum to 180°.",
    tutorial: [
      {
        title: "Alternate Interior Angles",
        text: "Look for the letter 'Z' hidden in the lines! Alternate interior angles are on opposite sides of the transversal track, trapped *inside* the two parallel lines. Just like the inner corners of a 'Z', if the top and bottom lines are parallel, these angles are exactly equal.",
        image: '/images/alternate-interior.jpeg'
      },
      {
        title: "Co-interior Angles",
        text: "Now look for the letter 'C'. Co-interior angles are on the *same* side of the transversal, trapped inside the parallel lines. Unlike the 'Z' angles, these aren't equal. Instead, they are teammates that always add up to 180° (supplementary).",
        image: '/images/co-interior.jpeg'
      }
    ],
    remediation: "Look for the letter \"Z\" for Alternate Interior (they are equal). Look for the letter \"C\" for Co-interior (they add to 180°).",
    problems: {
      easy: [
        {
          id: "kc7-e1",
          text: "Co-interior angles are 120° and x. Find x if the lines are parallel.",
          type: "numeric",
          answer: "60",
          difficulty: "easy",
          hints: [
            "Co-interior angles sum to 180°.",
            "120 + x = 180.",
            "Calculate 180 - 120."
          ],
          solution: "180 - 120 = 60."
        }
      ],
      medium: [
        {
          id: "kc7-m1",
          text: "Alternate interior angles are (4x - 10)° and (2x + 30)°. Find x.",
          type: "numeric",
          answer: "20",
          difficulty: "medium",
          hints: [
            "Alternate interior angles are equal.",
            "4x - 10 = 2x + 30.",
            "2x = 40, solve for x."
          ],
          solution: "4x - 10 = 2x + 30 implies 2x = 40, so x = 20."
        }
      ],
      hard: [
        {
          id: "kc7-h1",
          text: "Co-interior angles are (2x+15)° and (3x-10)°. Find the value of the smaller angle.",
          type: "numeric",
          answer: "85",
          difficulty: "hard",
          hints: [
            "Sum them to 180°: (2x + 15) + (3x - 10) = 180.",
            "5x + 5 = 180, so x = 35.",
            "Plug 35 back into the expressions: 2(35)+15 and 3(35)-10."
          ],
          solution: "5x + 5 = 180 implies x = 35. The angles are 85° and 95°. The smaller is 85°."
        }
      ]
    }
  },
  {
    id: "kc8",
    title: "Lines Parallel to the Same Line",
    explanation: "If two lines are parallel to a third line, they are parallel to each other.",
    tutorial: [
      {
        title: "Parallel Transitivity",
        text: "Imagine three train tracks. If Track A runs perfectly parallel to Track B, and Track B runs perfectly parallel to Track C, what can we say about A and C? They must also be parallel! This is called transitivity: if two lines are parallel to the same third line, they are parallel to each other.",
        image: '/images/parallel-lines.jpeg'
      }
    ],
    remediation: "If Train Track A runs parallel to Track B, and Track B runs parallel to Track C, then Track A and C will never cross. They are parallel.",
    problems: {
      easy: [
        {
          id: "kc8-e1",
          text: "If line A || B and line B || C, what is the relationship between A and C?",
          type: "multiple-choice",
          options: ["Parallel", "Perpendicular", "Intersecting"],
          answer: "Parallel",
          difficulty: "easy",
          hints: [
            "Use the property of lines parallel to the same line.",
            "They share a common parallel line.",
            "They must be parallel to each other."
          ],
          solution: "Lines parallel to the same line are parallel to each other."
        }
      ],
      medium: [
        {
          id: "kc8-m1",
          text: "l || m and m || n. A transversal cuts l creating an angle of 60°. What is the corresponding angle on n?",
          type: "numeric",
          answer: "60",
          difficulty: "medium",
          hints: [
            "Since l || m and m || n, then l || n.",
            "Corresponding angles for l and n are equal.",
            "It is exactly the same."
          ],
          solution: "Since l || n, the corresponding angle is also 60°."
        }
      ],
      hard: [
        {
          id: "kc8-h1",
          text: "AB || CD || EF. A transversal cuts them. An angle at AB is 2x, and its corresponding angle at EF is x+40. Find x.",
          type: "numeric",
          answer: "40",
          difficulty: "hard",
          hints: [
            "Since AB || EF, their corresponding angles are equal.",
            "2x = x + 40.",
            "Subtract x from both sides."
          ],
          solution: "2x = x + 40 implies x = 40."
        }
      ]
    }
  }
];
