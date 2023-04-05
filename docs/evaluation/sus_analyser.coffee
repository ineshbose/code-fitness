# Translation of https://github.com/ineshbose/portion-mate/blob/develop/docs/survey/analyser.py
# Install coffeescript & csv-parse, then run using `coffee sus_analyser.coffee`

fs = require 'fs'
{parse} = require 'csv-parse/sync'
sum = (arr) -> arr.reduce(((a, b) -> a + b), 0)

SUS_STATEMENTS = [
  "I think that I would like to use this system frequently."
  "I found the system unnecessarily complex."
  "I thought the system was easy to use."
  "I think that I would need the support of a technical person to be able to use this system."
  "I found the various functions in this system were well integrated."
  "I thought there was too much inconsistency in this system."
  "I would imagine that most people would learn to use this system very quickly."
  "I found the system very cumbersome & difficult to use."
  "I felt very confident using the system."
  "I needed to learn a lot of things before I could get going with this system."
]

content = fs.readFileSync "#{__dirname}/04.responses.csv"
responses = parse(content, { columns: true })
headers = Object.keys if responses.length > 0 then responses[0] else {}
responseCounter = {}

headers.forEach (question) ->
  responseCounter[question] = {}
  responses.forEach (response) ->
    responseCounter[question][response[question]] = (responseCounter[question][response[question]] || 0) + 1

console.log """#{
  (question + "\n--------------------------------------------------\n\n" + ("#{if r then r else 'N/A'}: #{responseCounter[question][r]}" for r in Object.keys responseCounter[question]).join("\n") for question in Object.keys responseCounter).join("\n\n==========================================================\n\n")
}\n\n"""

console.log """
Mean SUS Score from #{(responses.length)} responses: #{
  sum(
    (
      sum (
        (if SUS_STATEMENTS.indexOf(q) % 2 == 0 then r[q] - 1 else 5 - r[q]) for q of r when q in SUS_STATEMENTS
      )
    ) * 2.5 for r in responses
  ) / responses.length
}"""
