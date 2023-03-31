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
const chapterName = ['Chapter I', 'Chapter II', 'Chapter III', 'Chapter IV', 'Chapter V',
    'Chapter VI', 'Chapter VII', 'Chapter VIII', 'Chapter IX', 'Chapter X'];

const click_audio = new Audio("./assets/sound/click.mp3");
const beep_audio = new Audio("./assets/sound/beep.mp3");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        click_audio.play();
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

        $('#suspect_file_button_div').click(() => {
            alert(1);
            $("#SuspectFileModal").fadeIn(400);
        });

        $('#close').click(() => {
            alert(1);
            $("#SuspectFileModal").fadeOut(400);
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
        if (chapter.action) {
            this.action = chapter.action;
            this.actionType = chapter.action.actionType;
            if (this.actionType === 'suspect') {
                this.suspect = chapter.action.suspect;
                this.suspects(this.suspect);
            }
            if (this.actionType === 'evidence') {
                this.evidence = chapter.action.evidence;
                this.evidences(this.evidence);
            }

        }
        $("#chapter").fadeOut(1000);
        setTimeout(() => {
            $('#chapter #option1').unbind('click');
            $('#chapter #option2').unbind('click');
            $('#chapter #chapter_h1').text(chapterName.shift());
            $('#chapter #content_p2').text(chapter.description);
            $('#chapter #option1_p').text(chapter.optionOne.description);
            $('#chapter #option1').bind('click', () => {
                this.clickOption(chapter.optionOne.nextChapterId);
            });
            $('#chapter #option2_p').text(chapter.optionTwo.description);
            $('#chapter #option2').bind('click', () => {
                this.clickOption(chapter.optionTwo.nextChapterId);
            });
            $("#chapter").fadeIn(1000);
        },1500);

    }
    clickOption(ChapterId) {
        const selectedChapter = chapters.find(x => x.id === ChapterId);
        if (selectedChapter) {
            const nextChapter = new Chapter(
                selectedChapter.id,
                selectedChapter.description,
                new Option(selectedChapter.optionOne.description, selectedChapter.optionOne.nextChapterId),
                new Option(selectedChapter.optionTwo.description, selectedChapter.optionTwo.nextChapterId),
                selectedChapter.action

            )
            new ChapterCreator(nextChapter);
        }
    }
    suspects(suspect) {
        beep_audio.play();
        fetch('./suspectFiles.json')
            .then((response) => response.json())
            .then((suspectFiles) => {
                const SuspectFile = suspectFiles.find(x => x.suspect === suspect);
                this.suspectFileContent = SuspectFile.suspectFileContent;
                $('#SuspectName').text(suspect);
                $('#suspectContent').text(this.suspectFileContent);
                setTimeout(() => {
                    $("#suspect_file_button_div").fadeIn(1000);
                },1000);
                $("#sanık_h5").fadeIn(300);
                $("#saniklar").fadeIn(300);
                $("#" + suspect).fadeIn(300);
            });
    }

    evidences(evidence) {
        beep_audio.play();
        $("#delil_h5").fadeIn(300);
        $("#deliller").fadeIn(300);

        if (evidence === 'gun') {
            $("#gun").fadeIn(300);
        }

        if (evidence === 'gunContent') {
            $("#gun_secret_content").fadeIn(100);
            $("#unknown").fadeOut(100);
        }

        if (evidence === 'fingerprint') {
            $("#fingerprint").fadeIn(300);
        }

        if (evidence === 'phone') {
            $("#phone").fadeIn(300);
        }

    }
}

class Chapter {
    constructor(id, description, optionOne, optionTwo, action) {
        this.id = id;
        this.description = description;
        this.optionOne = optionOne;
        this.optionTwo = optionTwo;
        if (action) {
            this.action = action;
        }
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
    chapters[0].description,
    new Option(chapters[0].optionOne.description, chapters[0].optionOne.nextChapterId),
    new Option(chapters[0].optionTwo.description, chapters[0].optionTwo.nextChapterId),
    )

});