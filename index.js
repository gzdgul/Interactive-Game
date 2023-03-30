// Wrap every letter in a span
const textWrapper = document.querySelector('.ml12');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
const element_welcome2 = document.getElementById('welcome2');
const element_maindiv = document.getElementById('maindiv');
const element_nameInput = document.getElementById('nameInput');
const element_welcome_back = document.getElementById('welcome_back');
const element_welcome_back_h1 = document.getElementById('welcome_back_h1');
const element_fullAccessButton = document.getElementById('fullAccessButton');
const element_chapter_h1 = document.getElementById('chapter_h1');
const element_content_p1 = document.getElementById('content_p1');
const element_content_p2 = document.getElementById('content_p2');

let username = null;

const audio = new Audio("./assets/sound/click.mp3");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        audio.play();
    });
});
fetch('./chapters.json')
    .then((response) => response.json())
    .then((chapters) => {

$(document).ready(function(){

    $("#nameButton").click(function(){
        if (element_nameInput.value) {
            username = element_nameInput.value;
            element_welcome_back_h1.innerText = 'Welcome Back ' + username;
            $("#maindiv").fadeOut(1000);
            setTimeout(() => {
                $("#welcome_back").fadeIn(1000);
            },1000);
            setTimeout(() => {
                $("#welcome_back").fadeOut(1000);
            },3000);
            setTimeout(() => {
                $("#home").fadeIn(1000);
            },4000);
        }
    });

    /*
    const chapterName = ['Chapter II', 'Chapter III', 'Chapter IV', 'Chapter V',
        'Chapter VI', 'Chapter VII', 'Chapter VIII', 'Chapter IX', 'Chapter X'];
    */

    $("#playDemo").click(function(){
        $("#home").fadeOut(1000);

        setTimeout(() => {
            $("#chapter").fadeIn(1000);
        },2000);

    });

    $("#option1").click(function(){
        if (chapterName.length > 0) {
            $("#chapter").fadeOut(1000);

            setTimeout(() => {
                element_chapter_h1.innerText = chapterName.shift();
                $("#chapter").fadeIn(1000);
            },1500);
        }


    });

    $("#option2").click(function(){
        if (chapterName.length > 0) {
            $("#chapter").fadeOut(1000);

            setTimeout(() => {
                element_chapter_h1.innerText = chapterName.shift();
                $("#chapter").fadeIn(1000);
            },1500);
        }
    });

    // TODO: ANİMASYON FADE BAK!
    $("#nextButton").click(function(){
        new ChapterCreator(chapterOne);
        // Chapterın fadeOut'ıyla fixlemek için setTimeout verildi.
        setTimeout( () => {
            $("#content_p1").fadeOut(1000);
            $("#nextButton").fadeOut(1000);
        },300);
        setTimeout(() => {
            $("#content_p2").fadeIn(1000);
        },1000);
        setTimeout(() => {
            $("#optionsdiv").fadeIn(1000);
        },2000);
    });

});

anime.timeline({loop: true})
    .add({
        targets: '.ml12 .letter',
        translateX: [40,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1600,
        delay: (el, i) => 500 + 30 * i
    }).add({
    targets: '.ml12 .letter',
    translateX: [0,-30],
    opacity: [1,0],
    easing: "easeInExpo",
    duration: 1100,
    delay: (el, i) => 100 + 30 * i
});

class ChapterCreator {
    constructor(chapter) {
        this.id = chapter.id;
        $("#chapter").fadeOut(1000);
        setTimeout(() => {
            $('#chapter #option1').unbind('click');
            $('#chapter #option2').unbind('click');
            $('#chapter #chapter_h1').text(chapter.title);
            $('#chapter #content_p2').text(chapter.description);
            $('#chapter #option1_p').text(chapter.optionOne.description);
            $('#chapter #option1').bind('click', () => {
                this.nextChapterId = chapter.optionOne.nextChapterId;
                this.clickOption(this.nextChapterId);
            });
            $('#chapter #option2_p').text(chapter.optionTwo.description);
            $('#chapter #option2').bind('click', () => {
                this.nextChapterId = chapter.optionTwo.nextChapterId;
                this.clickOption(this.nextChapterId);
            });
            $("#chapter").fadeIn(1000);
        },1500);
    }
    clickOption(ChapterId) {
        const nextChapter = new Chapter(
            chapters[ChapterId].id,
            chapters[ChapterId].title,
            chapters[ChapterId].description,
            new Option(chapters[ChapterId].optionOne.description, chapters[ChapterId].optionOne.nextChapterId),
            new Option(chapters[ChapterId].optionTwo.description, chapters[ChapterId].optionTwo.nextChapterId)
        )
        new ChapterCreator(nextChapter);
    }
}

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

    const chapterOne = new Chapter(
    chapters[0].id,
    chapters[0].title,
    chapters[0].description,
    new Option(chapters[0].optionOne.description, chapters[0].optionOne.nextChapterId),
    new Option(chapters[0].optionTwo.description, chapters[0].optionTwo.nextChapterId)
    )

});

        /*
            const chapter1_1 = new Chapter(
            'CHAPTER 2',
            'HMM',
            new Option('AAA', null),
            new Option('BBB', null)
            )

            const chapter1_2 = new Chapter(
            'CHAPTER 2',
            'TMM',
            new Option('CCC', null),
            new Option('DDD', null)
            )
        */
/*
    const chapterOne = new Chapter(
    'CHAPTER I',
    'EVE GELDİM',
    new Option('MONTUNU ÇIKAR', chapter1_1),
    new Option('AYAKKABINI ÇIKAR', chapter1_2)
    )

*/





/*
const chooses = {

    title: 'CHAPTER 1',
    description: 'EVE GELDİM',
    optionOne: {
        description: 'MONTUNU ÇIKAR',
        chapter: {
            title: 'CHAPTER 2_1',
            description: 'HM',
            optionOne: {
                description: 'AAA'
            },
            optionTwo: {
                description: 'BBB'
            }
        }
    },
    optionTwo: {
        description: 'AYAKKABINI ÇIKAR',
        chapter: {
            title: 'CHAPTER 2_2',
            description: 'HAAM',
            optionOne: {
                description: 'CCC'
            },
            optionTwo: {
                description: 'DDD'
            }
        }
    }
}

 */