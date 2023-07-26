# TuringMachine - turing machine

## Usage

Install node package

```bash
npm install
```

Run this program

```bash
npm run start
```

## Example

```
Turing Machine!
Use - to represent empty data
Enter initial data (initial status, initial data without comma(optional), initial cursor position(optional), maximum number of repetition(optional))
(Ex: X, 1121-, 1, 100) > X, 1121-, 1, 10
Input commands
(Ex: (X, 2, P-, R, X); (X, 1, P0, R, X); (X, -, P-, N, Y);) > (X, 2, P-, R, X); (X, 1, P0, R, X); (X, -, P-, N, Y);
1121
X---
0121
-X--
0021
--X-
00-1
---X
00-0-
----X
00-0-
----Y
```

Decimal to binary

```
Turing Machine!
Use - to represent empty data
Enter initial data (initial status, initial data without comma(optional), initial cursor position(optional), maximum number of repetition(optional))
(Ex: X, 1121-, 1, 100) > qinit, 30, 1
Input commands
(Ex: (X, 2, P-, R, X); (X, 1, P0, R, X); (X, -, P-, N, Y);) > (qinit,0,P0,R,qinit);(qinit,1,P1,R,qinit);(qinit,2,P2,R,qinit);(qinit,3,P3,R,qinit);(qinit,4,P4,R,qinit);(qinit,5,P5,R,qinit);(qinit,6,P6,R,qinit);(qinit,7,P7,R,qinit);(qinit,8,P8,R,qinit);(qinit,9,P9,R,qinit);(qinit,-,P0,L,halve);(halve,0,P0,L,halve);(halve,1,P0,R,addHalf);(halve,2,P1,L,halve);(halve,3,P1,R,addHalf);(halve,4,P2,L,halve);(halve,5,P2,R,addHalf);(halve,6,P3,L,halve);(halve,7,P3,R,addHalf);(halve,8,P4,L,halve);(halve,9,P4,R,addHalf);(addHalf,0,P5,L,jump);(addHalf,1,P6,L,jump);(addHalf,2,P7,L,jump);(addHalf,3,P8,L,jump);(addHalf,4,P9,L,jump);(jump,0,P0,L,halve);(jump,1,P1,L,halve);(jump,2,P2,L,halve);(jump,3,P3,L,halve);(jump,4,P4,L,halve);(halve,-,P-,R,removezero);(removezero,0,P-,R,removezero);(removezero,1,P1,R,goBack);(removezero,2,P2,R,goBack);(removezero,3,P3,R,goBack);(removezero,4,P4,R,goBack);(removezero,5,P5,R,goBack);(removezero,6,P6,R,goBack);(removezero,7,P7,R,goBack);(removezero,8,P8,R,goBack);(removezero,9,P9,R,goBack);(removezero,-,P-,R,qfin);(goBack,0,P0,R,goBack);(goBack,1,P1,R,goBack);(goBack,2,P2,R,goBack);(goBack,3,P3,R,goBack);(goBack,4,P4,R,goBack);(goBack,5,P5,R,goBack);(goBack,6,P6,R,goBack);(goBack,7,P7,R,goBack);(goBack,8,P8,R,goBack);(goBack,9,P9,R,goBack);(goBack,-,P-,L,rest);(rest,0,P-,R,rest0);(rest0,-,P-,R,setrest0);(rest,5,P-,R,rest1);(rest1,-,P-,R,setrest1);(setrest0,0,P0,R,setrest0);(setrest0,1,P1,R,setrest0);(setrest1,0,P0,R,setrest1);(setrest1,1,P1,R,setrest1);(setrest0,-,P0,L,continue);(setrest1,-,P1,L,continue);(continue,0,P0,L,continue);(continue,1,P1,L,continue);(continue,-,P-,L,continue2);(continue2,-,P0,L,halve)
30
qinit-
30
-qinit
30-
--qinit
300
-halve-
300
halve--
100
-addHalf-
150
jump--
-150
halve---
150
removezero--
150
-goBack-
150
--goBack
150-
---goBack
150
--rest
15--
---rest0
15---
----setrest0
15--0
---continue-
15--0
--continue2--
150-0
-halve---
120-0
--addHalf--
125-0
-jump---
125-0
halve----
025-0
-addHalf---
075-0
jump----
-075-0
halve-----
075-0
removezero----
75-0
removezero---
75-0
-goBack--
75-0
--goBack-
75-0
-rest--
7--0
--rest1-
7--0
---setrest1
7--0-
----setrest1
7--01
---continue-
7--01
--continue--
7--01
-continue2---
70-01
halve----
30-01
-addHalf---
35-01
jump----
-35-01
halve-----
35-01
removezero----
35-01
-goBack---
35-01
--goBack--
35-01
-rest---
3--01
--rest1--
3--01
---setrest1-
3--01
----setrest1
3--01-
-----setrest1
3--011
----continue-
3--011
---continue--
3--011
--continue---
3--011
-continue2----
30-011
halve-----
10-011
-addHalf----
15-011
jump-----
-15-011
halve------
15-011
removezero-----
15-011
-goBack----
15-011
--goBack---
15-011
-rest----
1--011
--rest1---
1--011
---setrest1--
1--011
----setrest1-
1--011
-----setrest1
1--011-
------setrest1
1--0111
-----continue-
1--0111
----continue--
1--0111
---continue---
1--0111
--continue----
1--0111
-continue2-----
10-0111
halve------
00-0111
-addHalf-----
05-0111
jump------
-05-0111
halve-------
05-0111
removezero------
5-0111
removezero-----
5-0111
-goBack----
5-0111
rest-----
-0111
rest1----
0111
setrest1---
0111
-setrest1--
0111
--setrest1-
0111
---setrest1
0111-
----setrest1
01111
---continue-
01111
--continue--
01111
-continue---
01111
continue----
-01111
continue-----
--01111
continue2------
-0-01111
halve-------
0-01111
removezero------
-01111
removezero-----
01111
qfin----
```
