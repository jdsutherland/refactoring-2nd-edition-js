# Replace Function With Command

### Functions—either freestanding or attached to objects as methods—are one of the fundamental building blocks of programming.
* But there are times when it’s useful to encapsulate a function into its own object, which I refer to as a “command object” or simply a command.
* Such an object is mostly built around a single method, whose request and execution is the purpose of the object.

### A command offers a greater flexibility for the control and expression of a function than the plain function mechanism.
* Commands can have complimentary operations, such as undo.
* I can provide methods to build up their parameters to support a richer lifecycle.
* I can build in customizations using inheritance and hooks.
* If I’m working in a language with objects but without first-class functions, I can provide much of that capability by using commands instead.
* Similarly, I can use methods and fields to help break down a complex function, even in a language that lacks nested functions, and I can call those methods directly while testing and debugging.

All these are good reasons to use commands, and I need to be ready to refactor functions into commands when I need to. But we must not forget that this flexibility, as ever, comes at a price paid in complexity.
**So, given the choice between a first-class function and a command, I’ll pick the function 95% of the time. I only use a command when I specifically need a facility that simpler approaches can’t provide.**

### Like many words in software development, “command” is rather overloaded.
* In the context I’m using it here, _it is an object that encapsulates a request_, following the command pattern in Design Patterns [gof].
* When I use “command” in this sense, I use “command object” to set the context, and “command” afterwards.
The word “command” is also used in the _command-query separation principle_, where a command is an object method that changes observable state.
**I’ve always tried to avoid using command in that sense, preferring “modifier” or "mutator".**

To really show the value of this refactoring, I need a long and complicated function—but that would take too long to write, let alone for you to read.
> Instead, I’ll go with a function that’s short enough not to need it. This one scores points for an insurance application:

```javascript

function score(candidate, medicalExam, scoringGuide) {
  return new Scorer().execute(candidate, medicalExam, scoringGuide);
}
class Scorer {
  execute (candidate, medicalExam, scoringGuide) {
    let result = 0;
    let healthLevel = 0;
    let highMedicalRiskFlag = false;

    if (medicalExam.isSmoker) {
      healthLevel += 10;
      highMedicalRiskFlag = true;
    }
    let certificationGrade = "regular";
    if (scoringGuide.stateWithLowCertification(candidate.originState)) {
      certificationGrade = "low";
      result -= 5;
    }
    // lots more code like this
    result -= Math.max(healthLevel - 5, 0);
    return result;
  }
}
```
