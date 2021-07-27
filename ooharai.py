#!/usr/bin/env python3

import itertools
from pprint import pprint
import random


class KarakuriUnitSpin:

    def addQuadrant(self, num):
        return [3,0,1,2][num]

    def spin(self):
        self.faceDirection = self.addQuadrant(self.faceDirection)
        for unit in self.influenceUnit:
            unit.faceDirection = self.addQuadrant(unit.faceDirection)

    def __init__(self):
        self.faceDirection = 0
        self.influenceUnit = []

unitA = KarakuriUnitSpin()
unitB = KarakuriUnitSpin()
unitC = KarakuriUnitSpin()
unitD = KarakuriUnitSpin()

unitA.influenceUnit.append(unitD)
unitA.influenceUnit.append(unitB)
unitB.influenceUnit.append(unitA)
unitB.influenceUnit.append(unitC)
unitC.influenceUnit.append(unitB)
unitC.influenceUnit.append(unitD)
unitD.influenceUnit.append(unitC)
unitD.influenceUnit.append(unitA)


bruteForceTable = {}
def createbruteForceTable():
    FBLR = list(itertools.product('前奥左右', repeat=4))
    for tpl in FBLR:
        tplKey = ''.join(tpl)
        bruteForceTable[tplKey] = ''

def checkAndWrite(stack):
    global bruteForceTable
    stackStr = [str(n) for n in stack]
    reversedStack = ''.join(list(reversed(stackStr)))
    L1 = ['前','左','奥','右'][unitA.faceDirection]
    L2 = ['前','左','奥','右'][unitB.faceDirection]
    L3 = ['前','左','奥','右'][unitC.faceDirection]
    L4 = ['前','左','奥','右'][unitD.faceDirection]
    L0 = L1 + L2 + L3 + L4
    if bruteForceTable[L0] == '':
        bruteForceTable[L0] = reversedStack
    elif len(bruteForceTable[L0]) > len(reversedStack):
        bruteForceTable[L0] = reversedStack

def simulateInner(stack):
    pick = random.randrange(4)
    stack.append(pick)
    unitPicked = [unitA,unitB,unitC,unitD][pick]
    unitPicked.spin()
    checkAndWrite(stack)

def simulateOuter(innerRoopNum):
    unitA.faceDirection = 0
    unitB.faceDirection = 0
    unitC.faceDirection = 0
    unitD.faceDirection = 0
    stack = []
    for i in range(innerRoopNum):
        simulateInner(stack)

def output():
    moldList = [f'|{key}|{bruteForceTable[key]}|' for key in bruteForceTable.keys()]
    moldText = '\n'.join(moldList)
    with open('output.txt', 'w') as f:
        f.write(moldText)

def outputABC():
    for k in bruteForceTable.keys():
        bruteForceTable[k] = ''.join([['A','B','C','D'][int(p)] for p in list(bruteForceTable[k])])

createbruteForceTable()
for i in range(10000):
    simulateOuter(12)
# output()
outputABC()
pprint(bruteForceTable)



















