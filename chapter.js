let chaptersArray = [];
let chapter = {};

class Chapter {
    constructor(id, title, description, optionOne, optionTwo) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.optionOne = optionOne;
        this.optionTwo = optionTwo;
    }
}

class Option {
    constructor(description, nextChapterId) {
        this.description = description;
        this.nextChapterId = nextChapterId;
    }

}

let i = 0;
let k = 0;
let test = 0;
function def (id, description, optionOneDescription, optionTwoDescription) {

    while (i < 10) {
        let optionOne = new Option(optionOneDescription, (i+1));
        let optionTwo = new Option(optionTwoDescription, (i+2));
        let a = new Chapter(
            id, //id
            'title',
            description,
            optionOne,
            optionTwo
        )
        i += 2;

        def(optionOne.nextChapterId);
        chaptersArray.push(a);
    }

}

function def2 (id, description, optionOneDescription, optionTwoDescription) {

    while (k < 10) {
        let optionOne = new Option(optionOneDescription, (k+1));
        let optionTwo = new Option(optionTwoDescription, (k+2));
        let a = new Chapter(
            id, //id
            'title',
            description,
            optionOne,
            optionTwo
        )
        k += 2;
        def2(optionTwo.nextChapterId);
        chaptersArray.push(a);
    }

}
def(
    '0',
    'description',
    'optionOneDescription',
    'optionTwoDescription',
    );
def2(
    '0',
    'description',
    'optionOneDescription',
    'optionTwoDescription',
    );
console.log(chaptersArray);

/*
{
    "id": 0,
    "title": "CHAPTER I",
    "description": "1",

    "optionOne": {
      "description": "1.1",
      "nextChapterId": "1"
    },

    "optionTwo": {
      "description": "1.2",
      "nextChapterId": "2"
    }

  }
   {
    "id": 1,
    "title": "CHAPTER II",
    "description": "1.1",

    "optionOne": {
      "description": "1.1.1",
      "nextChapterId": "3"
    },

    "optionTwo": {
      "description": "1.1.2",
      "nextChapterId": "4"
    }
  },
*/

