export type Difficulty = 'easy' | 'medium' | 'hard';

export interface TutorialSection {
  title?: string;
  text: string;
  figure?: 'types-of-angles' | 'complementary' | 'supplementary' | 'adjacent' | 'linear-pair' | 'vertically-opposite' | 'transversal' | 'corresponding-angles' | 'alternate-interior' | 'co-interior' | 'parallel-lines';
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
  problems: Problem[];
}

export const domainContent: KC[] = [
  {
    id: 'kc1',
    title: 'Types of Angles',
    explanation: 'Angles are classified by their measure: Acute (<90°), Right (90°), Obtuse (90°–180°), Straight (180°), and Reflex (180°–360°).',
    tutorial: [
      {
        title: 'What is an Angle?',
        text: 'An angle is formed when two rays originate from the same end point. The rays making an angle are called the arms of the angle and the end point is called the vertex.'
      },
      {
        title: 'Classifying Angles by Measure',
        text: 'We classify angles based on how wide they are open, measured in degrees (°):\n\n• Acute Angle: Measures between 0° and 90°.\n• Right Angle: Exactly 90°. It looks like the corner of a square.\n• Obtuse Angle: Greater than 90° but less than 180°.\n• Straight Angle: Exactly 180°. It forms a straight line.\n• Reflex Angle: Greater than 180° but less than 360°.',
        figure: 'types-of-angles'
      }
    ],
    remediation: 'Think of angles like opening a door. Barely open = Acute (<90°). Open straight out = Right (90°). Open wide = Obtuse (>90°). Flat against the wall = Straight (180°).',
    problems: [
      {
        id: 'kc1-e1',
        text: 'Classify an angle of 135°.',
        type: 'multiple-choice',
        options: ['Acute', 'Right', 'Obtuse', 'Reflex'],
        answer: 'Obtuse',
        difficulty: 'easy',
        hints: [
          'Compare it to 90° and 180°.',
          'It is greater than 90° but less than 180°.',
          'Angles in this range are called obtuse.'
        ],
        solution: '135° is between 90° and 180°, so it is an obtuse angle.'
      },
      {
        id: 'kc1-e2',
        text: 'What type of angle is exactly a quarter of a full circle?',
        type: 'multiple-choice',
        options: ['Acute', 'Right', 'Obtuse', 'Straight'],
        answer: 'Right',
        difficulty: 'easy',
        hints: [
          'A full circle is 360°.',
          'Find 1/4 of 360°.',
          '360 / 4 = 90°.'
        ],
        solution: 'A quarter of 360° is 90°, which is a right angle.'
      },
      {
        id: 'kc1-m1',
        text: 'An angle is 30° more than a right angle. Classify it.',
        type: 'multiple-choice',
        options: ['Acute', 'Right', 'Obtuse', 'Reflex'],
        answer: 'Obtuse',
        difficulty: 'medium',
        hints: [
          'A right angle is 90°.',
          'Calculate 90° + 30°.',
          '120° is between 90° and 180°.'
        ],
        solution: '90° + 30° = 120°. Since it is between 90° and 180°, it is obtuse.'
      },
      {
        id: 'kc1-h1',
        text: 'If x is an acute angle, what type of angle is 180° - x?',
        type: 'multiple-choice',
        options: ['Acute', 'Right', 'Obtuse', 'Reflex'],
        answer: 'Obtuse',
        difficulty: 'hard',
        hints: [
          'Acute means x is between 0° and 90°.',
          'If you subtract a number less than 90 from 180, what is the range of the result?',
          'The result is always between 90° and 180°.'
        ],
        solution: 'Since 0 < x < 90, subtracting x from 180 gives a value between 90 and 180, which is obtuse.'
      }
    ]
  },
  {
    id: 'kc2',
    title: 'Complementary & Supplementary Angles',
    explanation: 'Complementary angles sum to 90°. Supplementary angles sum to 180°.',
    tutorial: [
      {
        title: 'Complementary Angles',
        text: 'Two angles are called complementary angles if their sum is exactly 90°. For example, a 30° angle and a 60° angle are complementary because 30° + 60° = 90°. When put together, they form a right angle.',
        figure: 'complementary'
      },
      {
        title: 'Supplementary Angles',
        text: 'Two angles are called supplementary angles if their sum is exactly 180°. For example, a 110° angle and a 70° angle are supplementary because 110° + 70° = 180°. When put together, they form a straight line.',
        figure: 'supplementary'
      }
    ],
    remediation: 'C comes before S in the alphabet, and 90 comes before 180. Complementary = 90°. Supplementary = 180°.',
    problems: [
      {
        id: 'kc2-e1',
        text: 'Find the complement of 40°.',
        type: 'numeric',
        answer: '50',
        difficulty: 'easy',
        hints: [
          'Complementary angles sum to 90°.',
          'Set up the equation: 40° + x = 90°.',
          'Calculate 90 - 40.'
        ],
        solution: '90° - 40° = 50°.'
      },
      {
        id: 'kc2-e2',
        text: 'Find the supplement of 110°.',
        type: 'numeric',
        answer: '70',
        difficulty: 'easy',
        hints: [
          'Supplementary angles sum to 180°.',
          'Set up the equation: 110° + x = 180°.',
          'Calculate 180 - 110.'
        ],
        solution: '180° - 110° = 70°.'
      },
      {
        id: 'kc2-m1',
        text: 'Two supplementary angles are in the ratio 1:2. What is the measure of the smaller angle?',
        type: 'numeric',
        answer: '60',
        difficulty: 'medium',
        hints: [
          'Let the angles be x and 2x.',
          'Supplementary angles sum to 180°, so x + 2x = 180°.',
          '3x = 180°, solve for x.'
        ],
        solution: '3x = 180° means x = 60°. The smaller angle is 60°.'
      },
      {
        id: 'kc2-h1',
        text: 'An angle is 20° less than its complement. Find the angle.',
        type: 'numeric',
        answer: '35',
        difficulty: 'hard',
        hints: [
          'Let the angle be x. Its complement is x + 20°.',
          'The sum of the angle and its complement is 90°. So, x + (x + 20°) = 90°.',
          '2x + 20 = 90, which means 2x = 70.'
        ],
        solution: '2x = 70° implies x = 35°.'
      }
    ]
  },
  {
    id: 'kc3',
    title: 'Adjacent Angles',
    explanation: 'Two angles are adjacent if they share a common vertex, a common arm, and their non-common arms are on opposite sides of the common arm.',
    tutorial: [
      {
        title: 'What makes angles adjacent?',
        text: 'Adjacent angles are like next-door neighbors. To be considered adjacent, two angles MUST meet three conditions:\n1. They have a common vertex (the corner point).\n2. They share a common arm (the ray between them).\n3. Their non-common arms are on different sides of the common arm (they don\'t overlap).',
        figure: 'adjacent'
      },
      {
        title: 'Adding Adjacent Angles',
        text: 'When two angles are adjacent, their sum is always equal to the total angle formed by the two non-common arms. For example, if Angle A is 30° and adjacent Angle B is 45°, the total angle they form together is 75°.'
      }
    ],
    remediation: 'Adjacent means "next door neighbors". They share a wall (arm) and a corner (vertex), but do not overlap rooms.',
    problems: [
      {
        id: 'kc3-e1',
        text: 'Do adjacent angles always sum to 180°?',
        type: 'multiple-choice',
        options: ['Yes', 'No'],
        answer: 'No',
        difficulty: 'easy',
        hints: [
          'Think of the definition of adjacent.',
          'They only need to share a vertex and an arm.',
          'They can sum to any value.'
        ],
        solution: 'No, they can sum to any degree (e.g., 30° and 40°).'
      },
      {
        id: 'kc3-m1',
        text: 'Angle PQR is 100°. Ray QS is inside. If angle PQS is 35°, find the adjacent angle SQR.',
        type: 'numeric',
        answer: '65',
        difficulty: 'medium',
        hints: [
          'Angle PQS + Angle SQR = Angle PQR.',
          '35° + Angle SQR = 100°.',
          'Subtract 35 from 100.'
        ],
        solution: '100° - 35° = 65°.'
      },
      {
        id: 'kc3-h1',
        text: 'Ray OB is between OA and OC. OD bisects angle AOB, OE bisects angle BOC. If angle AOC is 120°, find angle DOE.',
        type: 'numeric',
        answer: '60',
        difficulty: 'hard',
        hints: [
          'Angle DOE = Angle DOB + Angle BOE.',
          'Angle DOB is half Angle AOB, Angle BOE is half Angle BOC.',
          'Angle DOE = 1/2(Angle AOB + Angle BOC).'
        ],
        solution: 'Angle DOE = 1/2(120°) = 60°.'
      }
    ]
  },
  {
    id: 'kc4',
    title: 'Linear Pair Axiom',
    explanation: 'If a ray stands on a line, the sum of the two adjacent angles is 180°. These angles form a linear pair.',
    tutorial: [
      {
        title: 'The Linear Pair Axiom',
        text: 'A linear pair is a special case of adjacent angles. If the non-common arms of two adjacent angles form a straight line, the angles are called a linear pair.\n\nAxiom: If a ray stands on a line, then the sum of two adjacent angles so formed is 180°.',
        figure: 'linear-pair'
      },
      {
        title: 'The Converse',
        text: 'The reverse is also true! If the sum of two adjacent angles is 180°, then their non-common arms form a straight line. This is incredibly useful for proving that a line is straight.'
      }
    ],
    remediation: 'A straight line is a flat 180°. If a stick stands on it, it splits the 180° into two pieces. Piece 1 + Piece 2 = 180°.',
    problems: [
      {
        id: 'kc4-e1',
        text: 'Two angles form a linear pair. One is 70°, find the other.',
        type: 'numeric',
        answer: '110',
        difficulty: 'easy',
        hints: [
          'A linear pair sums to 180°.',
          'Set up the equation: 70° + x = 180°.',
          'Calculate 180 - 70.'
        ],
        solution: '180° - 70° = 110°.'
      },
      {
        id: 'kc4-m1',
        text: 'One angle of a linear pair is 40° more than the other. Find the smaller angle.',
        type: 'numeric',
        answer: '70',
        difficulty: 'medium',
        hints: [
          'Let the smaller angle be x. The larger is x + 40°.',
          'x + (x + 40°) = 180°.',
          '2x = 140°, solve for x.'
        ],
        solution: '2x = 140° implies x = 70°.'
      },
      {
        id: 'kc4-h1',
        text: 'Angles (3x - 10)° and (2x + 15)° form a linear pair. Find the value of x.',
        type: 'numeric',
        answer: '35',
        difficulty: 'hard',
        hints: [
          'Sum the two expressions and set them equal to 180°.',
          '(3x - 10) + (2x + 15) = 180.',
          '5x + 5 = 180, so 5x = 175.'
        ],
        solution: '5x = 175 implies x = 35.'
      }
    ]
  },
  {
    id: 'kc5',
    title: 'Vertically Opposite Angles',
    explanation: 'When two lines intersect, the angles opposite each other at the vertex are equal.',
    tutorial: [
      {
        title: 'Intersecting Lines',
        text: 'When two lines intersect each other, they form four angles around the point of intersection. The angles that are directly opposite to each other are called vertically opposite angles.',
        figure: 'vertically-opposite'
      },
      {
        title: 'Theorem: Vertically Opposite Angles are Equal',
        text: 'If two lines intersect each other, then the vertically opposite angles are equal. This can be proven using the Linear Pair Axiom: since adjacent angles on the straight lines must sum to 180°, the opposite angles must be mathematically identical.'
      }
    ],
    remediation: 'When two lines cross, they make an "X". The angles across from each other (top/bottom or left/right) are identical twins.',
    problems: [
      {
        id: 'kc5-e1',
        text: 'Two lines intersect. If one angle is 60°, find its vertically opposite angle.',
        type: 'numeric',
        answer: '60',
        difficulty: 'easy',
        hints: [
          'Vertically opposite angles are equal.',
          'It must be the same as the given angle.',
          'The angle is 60°.'
        ],
        solution: 'Vertically opposite angles are equal, so it is 60°.'
      },
      {
        id: 'kc5-m1',
        text: 'Two lines intersect. One angle is 45°. What is the measure of the adjacent angle next to it?',
        type: 'numeric',
        answer: '135',
        difficulty: 'medium',
        hints: [
          'Adjacent angles on intersecting lines form a linear pair.',
          'A linear pair sums to 180°.',
          'Calculate 180 - 45.'
        ],
        solution: '180° - 45° = 135°.'
      },
      {
        id: 'kc5-h1',
        text: 'Two lines intersect. The sum of two vertically opposite angles is 130°. Find the measure of one of the other two angles.',
        type: 'numeric',
        answer: '115',
        difficulty: 'hard',
        hints: [
          'Let the vertically opposite angles be x. So x + x = 130°.',
          'x = 65°. Now find the angle adjacent to it.',
          'The adjacent angle forms a linear pair with 65°. Calculate 180 - 65.'
        ],
        solution: '2x = 130° -> x = 65°. The adjacent angle is 180° - 65° = 115°.'
      }
    ]
  },
  {
    id: 'kc6',
    title: 'Transversals & Corresponding Angles',
    explanation: 'A transversal is a line intersecting two or more lines. Corresponding angles are in the same relative position at each intersection. If lines are parallel, these are equal.',
    tutorial: [
      {
        title: 'What is a Transversal?',
        text: 'A line that intersects two or more lines at distinct points is called a transversal.',
        figure: 'transversal'
      },
      {
        title: 'Corresponding Angles',
        text: 'Corresponding angles are in the same relative position at each intersection where the straight line crosses the parallel lines. If the two lines are parallel, then the corresponding angles are equal.',
        figure: 'corresponding-angles'
      }
    ],
    remediation: 'Imagine a ladder over two parallel train tracks. The angles at the same "corner" of each track are Corresponding and equal.',
    problems: [
      {
        id: 'kc6-e1',
        text: 'Parallel lines are cut by a transversal. One angle is 80°. What is its corresponding angle?',
        type: 'numeric',
        answer: '80',
        difficulty: 'easy',
        hints: [
          'Corresponding angles are equal when lines are parallel.',
          'It must be the same value.',
          'The answer is 80.'
        ],
        solution: 'Corresponding angles are equal, so it is 80°.'
      },
      {
        id: 'kc6-m1',
        text: 'Corresponding angles are (3x + 10)° and 100°. Find x if the lines are parallel.',
        type: 'numeric',
        answer: '30',
        difficulty: 'medium',
        hints: [
          'Set them equal to each other.',
          '3x + 10 = 100.',
          '3x = 90, solve for x.'
        ],
        solution: '3x + 10 = 100 implies 3x = 90, so x = 30.'
      },
      {
        id: 'kc6-h1',
        text: 'A transversal cuts two parallel lines. The bisectors of a pair of corresponding angles are drawn. Are the bisectors parallel?',
        type: 'multiple-choice',
        options: ['Yes', 'No'],
        answer: 'Yes',
        difficulty: 'hard',
        hints: [
          'Let the corresponding angles be 2x.',
          'The bisectors create angles of x.',
          'Since the corresponding angles of the bisectors are equal (x=x), they are parallel.'
        ],
        solution: 'The bisectors form equal corresponding angles, meaning they must be parallel.'
      }
    ]
  },
  {
    id: 'kc7',
    title: 'Alternate Interior & Co-interior Angles',
    explanation: 'For parallel lines cut by a transversal, alternate interior angles (Z-shape) are equal, and co-interior angles (C-shape) sum to 180°.',
    tutorial: [
      {
        title: 'Alternate Interior Angles',
        text: 'Alternate interior angles are a pair of angles on opposite sides of the transversal and between the two lines. If the lines are parallel, these angles are equal. Look for a "Z" shape.',
        figure: 'alternate-interior'
      },
      {
        title: 'Co-interior Angles',
        text: 'Co-interior angles are on the same side of the transversal and between the two lines. If the lines are parallel, they add up to 180° (they are supplementary). Look for a "C" shape.',
        figure: 'co-interior'
      }
    ],
    remediation: 'Look for the letter "Z" for Alternate Interior (they are equal). Look for the letter "C" for Co-interior (they add to 180°).',
    problems: [
      {
        id: 'kc7-e1',
        text: 'Co-interior angles are 120° and x. Find x if the lines are parallel.',
        type: 'numeric',
        answer: '60',
        difficulty: 'easy',
        hints: [
          'Co-interior angles sum to 180°.',
          '120 + x = 180.',
          'Calculate 180 - 120.'
        ],
        solution: '180 - 120 = 60.'
      },
      {
        id: 'kc7-m1',
        text: 'Alternate interior angles are (4x - 10)° and (2x + 30)°. Find x.',
        type: 'numeric',
        answer: '20',
        difficulty: 'medium',
        hints: [
          'Alternate interior angles are equal.',
          '4x - 10 = 2x + 30.',
          '2x = 40, solve for x.'
        ],
        solution: '4x - 10 = 2x + 30 implies 2x = 40, so x = 20.'
      },
      {
        id: 'kc7-h1',
        text: 'Co-interior angles are (2x+15)° and (3x-10)°. Find the value of the smaller angle.',
        type: 'numeric',
        answer: '85',
        difficulty: 'hard',
        hints: [
          'Sum them to 180°: (2x + 15) + (3x - 10) = 180.',
          '5x + 5 = 180, so x = 35.',
          'Plug 35 back into the expressions: 2(35)+15 and 3(35)-10.'
        ],
        solution: '5x + 5 = 180 implies x = 35. The angles are 85° and 95°. The smaller is 85°.'
      }
    ]
  },
  {
    id: 'kc8',
    title: 'Lines Parallel to the Same Line',
    explanation: 'If two lines are parallel to a third line, they are parallel to each other.',
    tutorial: [
      {
        title: 'Parallel Transitivity',
        text: 'If line A is parallel to line B, and line B is parallel to line C, then line A must also be parallel to line C. This is a fundamental property of parallel lines.',
        figure: 'parallel-lines'
      }
    ],
    remediation: 'If Train Track A runs parallel to Track B, and Track B runs parallel to Track C, then Track A and C will never cross. They are parallel.',
    problems: [
      {
        id: 'kc8-e1',
        text: 'If line A || B and line B || C, what is the relationship between A and C?',
        type: 'multiple-choice',
        options: ['Parallel', 'Perpendicular', 'Intersecting'],
        answer: 'Parallel',
        difficulty: 'easy',
        hints: [
          'Use the property of lines parallel to the same line.',
          'They share a common parallel line.',
          'They must be parallel to each other.'
        ],
        solution: 'Lines parallel to the same line are parallel to each other.'
      },
      {
        id: 'kc8-m1',
        text: 'l || m and m || n. A transversal cuts l creating an angle of 60°. What is the corresponding angle on n?',
        type: 'numeric',
        answer: '60',
        difficulty: 'medium',
        hints: [
          'Since l || m and m || n, then l || n.',
          'Corresponding angles for l and n are equal.',
          'It is exactly the same.'
        ],
        solution: 'Since l || n, the corresponding angle is also 60°.'
      },
      {
        id: 'kc8-h1',
        text: 'AB || CD || EF. A transversal cuts them. An angle at AB is 2x, and its corresponding angle at EF is x+40. Find x.',
        type: 'numeric',
        answer: '40',
        difficulty: 'hard',
        hints: [
          'Since AB || EF, their corresponding angles are equal.',
          '2x = x + 40.',
          'Subtract x from both sides.'
        ],
        solution: '2x = x + 40 implies x = 40.'
      }
    ]
  }
];
