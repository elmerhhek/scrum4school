document.addEventListener('DOMContentLoaded', () => {
    const ritualLinks = document.querySelectorAll('nav ul li a');
    const ritualContent = document.getElementById('ritual-content');
    const defaultTextSection = document.getElementById('default-text');

    // Timer Elemente
    const timerDisplay = document.getElementById('timer-display');
    const startStopButton = document.getElementById('start-stop-timer');
    const resetButton = document.getElementById('reset-timer');
    const minutesInput = document.getElementById('timer-minutes');
    const setTimer15Button = document.getElementById('set-timer-15');
    const setTimer45Button = document.getElementById('set-timer-45');
    const timerPlus5Button = document.getElementById('timer-plus-5');
    const timerMinus5Button = document.getElementById('timer-minus-5');
    const timerGong = document.getElementById('timer-gong');

    let timerInterval;
    let timeLeft;
    let isTimerRunning = false;
    let initialTimeSet = 15 * 60;

    // Inhalte der Scrum-Rituale
    const ritualsData = {
        'sprint-planning': {
            title: 'Sprint Planning',
            widgets: [
                {
                    title: 'Beschreibung',
                    content: 'Das Sprint Planning findet immer zu Beginn eines neuen Sprints statt und ist sozusagen die "Strategiebesprechung" eures Schülerteams für die kommende Arbeitsphase. Hier legt ihr gemeinsam fest, welche Aufgaben aus dem großen Projektplan (dem Product Backlog) ihr euch für diesen Sprint vornehmt und wie ihr diese konkret umsetzen wollt. Stellt euch vor, ihr packt euren Rucksack für die nächste Etappe eurer Projektreise: Ihr wählt die wichtigsten Dinge aus, die ihr mitnehmt (Aufgaben), und überlegt euch, wie ihr den Weg am besten meistert (die Umsetzung). Am Ende des Sprint Plannings wisst ihr genau, was das Ziel des Sprints ist (Sprint-Ziel) und welche konkreten Arbeitspakete jeder Einzelne oder Kleingruppen bis zum Ende des Sprints erledigen werden.'
                },
                {
                    title: 'Aktivitäten',
                    items: [
                        '<strong>Verständnis des Product Backlogs:</strong> Der "Product Owner" (oft die Lehrkraft oder ein/e dafür bestimmte/r Schüler/in) stellt die wichtigsten Aufgaben aus dem Product Backlog vor und beantwortet Fragen dazu.',
                        '<strong>Auswahl der Sprint-Aufgaben:</strong> Das Team wählt gemeinsam aus, welche Aufgaben aus dem Product Backlog realistischerweise im kommenden Sprint erledigt werden können.',
                        '<strong>Definition des Sprint-Ziels:</strong> Das Team formuliert ein übergeordnetes Ziel, das mit den ausgewählten Aufgaben im Sprint erreicht werden soll.',
                        '<strong>Zerlegung in Teilaufgaben:</strong> Die ausgewählten größeren Aufgaben (z.B. User Stories) werden in kleinere, konkrete Arbeitspakete oder Tasks zerlegt.',
                        '<strong>Schätzung des Aufwands:</strong> Das Team schätzt für jede Aufgabe den benötigten Aufwand (z.B. in Stunden oder Story Points).',
                        '<strong>Erstellung des Agile Boards:</strong> Die ausgewählten Aufgaben und die dazugehörigen Tasks bilden den Plan für den Sprint (das Agile Board).',
                        '<strong>Commitment zum Sprint-Ziel:</strong> Das Team verpflichtet sich gemeinsam, das Sprint-Ziel zu erreichen und die geplanten Aufgaben bestmöglich umzusetzen.',
                        '<strong>Klärung von Abhängigkeiten und Ressourcen:</strong> Eventuelle Abhängigkeiten zwischen Aufgaben oder benötigte Ressourcen (Material, Zugang zu Räumen etc.) werden besprochen.'
                    ]
                },
                {
                    title: 'Leitfragen',
                    items: [
                        '"Was ist das übergeordnete Ziel, das wir mit diesem Sprint für unser Projekt erreichen wollen?"',
                        '"Welche Aufgaben aus dem Product Backlog sind am wichtigsten, um dieses Ziel zu erreichen?"',
                        '"Welche dieser Aufgaben können wir als Team realistisch im kommenden Sprint fertigstellen, unter Berücksichtigung unserer verfügbaren Zeit und Fähigkeiten?"',
                        '"Verstehen alle im Team die Anforderungen und Akzeptanzkriterien für die ausgewählten Aufgaben?"',
                        '"Gibt es Abhängigkeiten zwischen den Aufgaben, die wir berücksichtigen müssen?"',
                        '"Wie können wir die ausgewählten Aufgaben in kleinere, konkrete Arbeitsschritte (Tasks) unterteilen?"',
                        '"Wer aus dem Team könnte welche Tasks übernehmen oder wer hat das nötige Wissen dafür?" (Selbstorganisation des Teams)',
                        '"Wie viel Zeit oder Aufwand schätzen wir für die einzelnen Tasks ein?"',
                        '"Sind alle notwendigen Ressourcen (Materialien, Informationen, Zugänge) für die Umsetzung vorhanden oder wie beschaffen wir sie?"',
                        '"Wie stellen wir sicher, dass wir als Team gut zusammenarbeiten, um das Sprint-Ziel zu erreichen?"',
                        '"Haben wir einen klaren Plan (Sprint Backlog), dem alle zustimmen können?"'
                    ]
                }
            ]
        },
        'daily-scrum': {
            title: 'Daily Scrum',
            widgets: [
                {
                    title: 'Beschreibung',
                    content: 'Das Daily Scrum ist ein kurzes, tägliches Treffen eures Schülerteams, das idealerweise immer zur gleichen Zeit und am gleichen Ort stattfindet – oft im Stehen, um es kurz zu halten (daher "Stand-up"). Stellt es euch wie einen schnellen "Boxenstopp" vor, bei dem jedes Teammitglied in maximal 1-2 Minuten berichtet, woran es seit dem letzten Treffen gearbeitet hat, was es heute plant und ob es irgendwelche Hindernisse gibt. Es dient dazu, dass sich alle auf den aktuellen Stand bringen, den Fortschritt in Richtung Sprint-Ziel gemeinsam im Blick behalten und sich gegenseitig bei Problemen unterstützen können. Ziel ist es, die Arbeit für den kommenden Schultag oder die nächsten Projektstunden zu synchronisieren und sicherzustellen, dass alle wissen, was zu tun ist und wo vielleicht Hilfe benötigt wird.'
                },
                {
                    title: 'Aktivitäten',
                    items: [
                        '<strong>Pünktliches Erscheinen:</strong> Alle Teammitglieder treffen sich zur vereinbarten Zeit.',
                        '<strong>Kurze Berichterstattung:</strong> Jedes Mitglied beantwortet reihum die drei Kernfragen des Daily Scrums.',
                        '<strong>Aktives Zuhören:</strong> Die anderen Teammitglieder hören aufmerksam zu, um den Fortschritt und mögliche Probleme zu verstehen.',
                        '<strong>Identifizierung von Hindernissen:</strong> Probleme oder Blockaden (Impediments), die Einzelne oder das Team am Weiterkommen hindern, werden angesprochen.',
                        '<strong>Fokus auf das Sprint-Ziel:</strong> Die Diskussionen bleiben auf das Erreichen des aktuellen Sprint-Ziels ausgerichtet.',
                        '<strong>(Kurze) Plananpassung:</strong> Bei Bedarf wird der Plan für den Tag vom Team angepasst; längere Diskussionen über Problemlösungen finden erst nach dem Daily Scrum in kleinerer Runde statt.',
                        '<strong>Visualisierung nutzen:</strong> Oft wird das Agile Board (Taskboard) während des Daily Scrums als Orientierung genutzt, um den Status der Aufgaben zu sehen.'
                    ]
                },
                {
                    title: 'Leitfragen',
                    items: [
                        '"Was habe ich seit dem letzten Daily Scrum für das Erreichen unseres Sprint-Ziels getan/erledigt?"',
                        '"Was werde ich bis zum nächsten Daily Scrum tun, um unser Sprint-Ziel weiter voranzubringen?"',
                        '"Welche Hindernisse oder Probleme sehe ich, die mich oder das Team davon abhalten könnten, unser Sprint-Ziel zu erreichen?"'
                    ]
                }
            ]
        },
        'sprint-review': {
            title: 'Sprint Review',
            widgets: [
                {
                    title: 'Beschreibung',
                    content: 'Das Sprint Review ist der Moment am Ende eines Sprints, in dem ihr als Schülerteam stolz eure Ergebnisse präsentiert – also das, was ihr im Sprint konkret erarbeitet und fertiggestellt habt. Stellt euch vor, ihr zeigt euren Lehrkräften, Mitschülerinnen und Mitschülern (oder vielleicht sogar externen "Auftraggebern" eures Projekts), was euer Produkt oder Projektteil nun kann. Es geht darum, Feedback zu dem aktuellen Stand eures Projekts zu bekommen und gemeinsam zu überlegen, ob die Richtung noch stimmt oder Anpassungen für die nächsten Sprints nötig sind. Diese Rückmeldungen sind super wertvoll, um euer Projekt im weiteren Verlauf noch besser auf die Ziele auszurichten. Es ist also eine Art "Show and Tell" mit direktem Austausch und gemeinsamer Planung der nächsten Schritte.'
                },
                {
                    title: 'Aktivitäten',
                    items: [
                        '<strong>Vorstellung der Sprint-Ziele:</strong> Kurz erklären, was sich das Team für diesen Sprint vorgenommen hatte.',
                        '<strong>Demonstration des Produktinkrements:</strong> Live zeigen, welche Funktionen oder Projektteile umgesetzt wurden und wie sie funktionieren.',
                        '<strong>Erläuterung der "Definition of Done":</strong> Kurz darstellen, welche Kriterien erfüllt sein mussten, damit eine Aufgabe als "fertig" gilt.',
                        '<strong>Diskussion des Erreichten:</strong> Besprechen, welche der geplanten Aufgaben umgesetzt werden konnten und welche eventuell nicht und warum.',
                        '<strong>Einholen von Feedback:</strong> Aktiv Fragen an die "Stakeholder" (Lehrer, Mitschüler, etc.) stellen und deren Rückmeldungen zum Gezeigten sammeln.',
                        '<strong>Beantwortung von Fragen:</strong> Fragen der Stakeholder zum Produktinkrement und zum Prozess beantworten.',
                        '<strong>Diskussion über nächste Schritte:</strong> Gemeinsam mit den Stakeholdern überlegen, welche Anpassungen am "Product Backlog" (der Aufgabenliste für das Gesamtprojekt) sinnvoll sind und was die wichtigsten nächsten Schritte sein könnten.'
                    ]
                },
                {
                    title: 'Leitfragen',
                    items: [
                        '"Warum habt ihr euch für diese spezielle Lösung entschieden?"',
                        '"Welche Herausforderungen hattet ihr bei der Umsetzung?"',
                        '"Was sind eure Pläne für die Weiterentwicklung dieses Features?"',
                        '"Wie sicher seid ihr, dass die aktuellen Ergebnisse stabil und nutzbar sind?"',
                        '"Welche der noch offenen Aufgaben aus dem Product Backlog seht ihr als nächstes an?"'
                    ]
                }
            ]
        },
        'sprint-retrospective': {
            title: 'Sprint Retrospektive',
            widgets: [
                {
                    title: 'Beschreibung',
                    content: 'Die Sprint Retrospektive ist für euch als Schülerteam eine wichtige Gelegenheit, um am Ende eines Sprints innezuhalten und gemeinsam auf eure Zusammenarbeit und euren Lernprozess zu schauen. Stellt euch das wie eine Art "Teambesprechung" vor, bei der ihr offen darüber sprecht, was im letzten Projektzyklus gut gelaufen ist und wo es noch Verbesserungspotenzial gibt. Ziel ist es, aus den Erfahrungen zu lernen und konkrete Ideen zu entwickeln, wie ihr als Team im nächsten Sprint noch besser und effektiver zusammenarbeiten könnt, um eure Projektziele zu erreichen. Es geht nicht darum, Schuldige zu suchen, sondern gemeinsam Wege zu finden, eure Teamarbeit und eure Ergebnisse kontinuierlich zu optimieren. So werdet ihr von Sprint zu Sprint nicht nur im Projekt selbst, sondern auch als Team immer besser.'
                },
                {
                    title: 'Aktivitäten',
                    items: [
                        '<strong>Sammeln von Eindrücken:</strong> Alle Teammitglieder teilen ihre Beobachtungen und Gefühle zum vergangenen Sprint (z.B. was war gut, was war frustrierend).',
                        '<strong>Analyse der Zusammenarbeit:</strong> Gemeinsame Diskussion darüber, wie die Teamarbeit funktioniert hat (Kommunikation, Hilfsbereitschaft, Umgang mit Problemen).',
                        '<strong>Identifizierung von Hindernissen:</strong> Aufdecken von Schwierigkeiten oder Blockaden, die das Team gebremst haben.',
                        '<strong>Hervorheben von Erfolgen:</strong> Würdigen, was gut gelaufen ist und welche Methoden oder Ansätze erfolgreich waren.',
                        '<strong>Brainstorming für Verbesserungen:</strong> Gemeinsames Entwickeln von konkreten, umsetzbaren Ideen und Maßnahmen, um die Zusammenarbeit oder den Prozess im nächsten Sprint zu verbessern.',
                        '<strong>Festlegen von Maßnahmen:</strong> Auswahl von ein bis zwei konkreten Verbesserungspunkten, die das Team im nächsten Sprint umsetzen möchte.'
                    ]
                },
                {
                    title: 'Leitfragen für die Reflexion',
                    items: [
                        '"Was sollten wir anfangen zu tun?"',
                        '"Was sollten wir aufhören zu tun?"',
                        '"Was sollten wir weiterhin tun?"'
                    ]
                }
            ]
        },
        'glossar': {
            title: 'Scrum Glossar',
            widgets: [
                {
                    title: 'Wichtige Scrum-Begriffe',
                    items: [
                        '<strong>Scrum:</strong> Scrum ist ein Rahmenwerk für agiles Projektmanagement, das Teams hilft, komplexe Produkte schrittweise in kurzen Zyklen zu entwickeln und dabei flexibel auf Änderungen reagieren zu können.',
                        '<strong>Sprint:</strong> Ein Sprint ist ein festgelegter, kurzer Zeitabschnitt, in dem ein Scrum-Team ein funktionsfähiges Produktinkrement erstellt.',
                        '<strong>Daily Stand-Up:</strong> Das Daily Stand-Up oder Daily Scrum ist ein kurzes, tägliches Meeting, in dem das Entwicklungsteam seine Fortschritte synchronisiert, Hindernisse identifiziert und den Plan für die nächste Unterrichtsstunde abstimmt.',
                        '<strong>Sprint Retrospektive:</strong> Die Sprint Retrospektive ist ein Meeting am Ende eines Sprints, in dem das Scrum-Team die Zusammenarbeit reflektiert und Verbesserungsmaßnahmen für den nächsten Sprint plant.',
                        '<strong>Sprint Planning:</strong> Das Sprint Planning ist ein Meeting zu Beginn eines Sprints, in dem das Scrum-Team die Arbeit für den kommenden Sprint auswählt und plant.',
                        '<strong>Sprint Review:</strong> Das Sprint Review ist ein Meeting am Ende des Sprints, in dem das Scrum-Team das fertige Produktinkrement den Stakeholdern präsentiert und Feedback einholt.',
                        '<strong>Akzeptanzkriterien:</strong> Akzeptanzkriterien sind vorab definierte Bedingungen, die eine User Story oder ein Product Backlog Item erfüllen muss, um als "erledigt" oder "abgenommen" zu gelten.',
                        '<strong>User Stories:</strong> User Stories sind kurze, einfache Beschreibungen einer Funktionalität aus der Perspektive des Nutzers, die ausdrücken, was er tun möchte und welchen Nutzen er davon hat.',
                        '<strong>Definition of Done:</strong> Die Definition of Done (DoD) ist eine für alle im Scrum-Team gültige, gemeinsame Vereinbarung darüber, wann eine Aufgabe oder ein Produktinkrement als vollständig abgeschlossen gilt.',
                        '<strong>Agile Board:</strong> Ein Agile Board ist eine visuelle Darstellung des Arbeitsflusses, die dem Team hilft, Aufgaben zu organisieren, deren Fortschritt zu verfolgen und Engpässe zu erkennen.',
                        '<strong>Product Backlog:</strong> Das Product Backlog ist eine priorisierte und sich ständig weiterentwickelnde Liste aller bekannten Anforderungen, Funktionen und Verbesserungen, die für ein Produkt benötigt werden.',
                        '<strong>Product Owner:</strong> Der Product Owner ist die Lehrkraft oder eine Person im Scrum-Team, die dafür verantwortlich ist, den Wert des Produkts zu maximieren, indem sie das Product Backlog verwaltet und priorisiert.',
                        '<strong>Scrum Master: </strong> Der Scrum Master ist dafür verantwortlich, das Scrum-Framework im Team zu etablieren, Hindernisse zu beseitigen und sicherzustellen, dass das Team die agilen Prinzipien und Praktiken versteht und anwendet.',
                        '<strong>Scrum Team: </strong> Das Scrum Team ist eine selbstorganisierte und funktionsübergreifende Gruppe von Fachleuten, bestehend aus dem Product Owner, dem Scrum Master und den Entwicklern, die gemeinsam für die Lieferung wertvoller Produktinkremente verantwortlich sind.',
                        '<strong>Stakeholder: </strong> Ein Stakeholder im Scrum-Umfeld ist jede Person oder Gruppe, die ein Interesse am Produkt hat und dessen Entwicklung beeinflussen kann oder von ihr beeinflusst wird, wie zum Beispiel Kunden, Anwender oder das Management - im schulischen Kontext zumeist die Lehrkraft.'
                    ]
                }
            ]
        }
    };

    function displayRitual(ritualKey) {
        // Alle Sektionen ausblenden
        document.querySelectorAll('.ritual-section').forEach(section => {
            section.classList.remove('active');
        });

        // Alten Ritual-Inhalt entfernen, außer dem Standardtext
        const existingRitualContent = ritualContent.querySelector('.ritual-dynamic-content');
        if (existingRitualContent) {
            existingRitualContent.remove();
        }

        if (ritualsData[ritualKey]) {
            defaultTextSection.classList.remove('active'); // Standardtext ausblenden
            const data = ritualsData[ritualKey];
            const section = document.createElement('section');
            section.id = ritualKey;
            section.classList.add('ritual-section', 'ritual-dynamic-content', 'active');

            const title = document.createElement('h2');
            title.textContent = data.title;
            section.appendChild(title);

            data.widgets.forEach(widgetData => {
                const widgetDiv = document.createElement('div');
                widgetDiv.classList.add('widget');

                const widgetTitle = document.createElement('h3');
                widgetTitle.textContent = widgetData.title;
                widgetDiv.appendChild(widgetTitle);

                if (widgetData.content) {
                    const p = document.createElement('p');
                    p.innerHTML = widgetData.content; // innerHTML für fette Schrift im Glossar
                    widgetDiv.appendChild(p);
                }

                if (widgetData.items) {
                    const ul = document.createElement('ul');
                    widgetData.items.forEach(itemText => {
                        const li = document.createElement('li');
                        li.innerHTML = itemText; // innerHTML für fette Schrift im Glossar
                        ul.appendChild(li);
                    });
                    widgetDiv.appendChild(ul);
                }
                section.appendChild(widgetDiv);
            });
            ritualContent.appendChild(section);
        } else {
            defaultTextSection.classList.add('active'); // Standardtext anzeigen, wenn kein Ritual gefunden wurde
        }

        // Aktiven Link im Menü hervorheben
        ritualLinks.forEach(link => {
            link.classList.remove('active-ritual');
            if (link.dataset.ritual === ritualKey) {
                link.classList.add('active-ritual');
            }
        });
    }

    ritualLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const ritualKey = event.target.dataset.ritual;
            displayRitual(ritualKey);
        });
    });

    // Timer-Funktionalität
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        if (isTimerRunning) return;
        isTimerRunning = true;
        startStopButton.textContent = 'Stop';
        timerDisplay.classList.remove('timer-ended');

        // Setze timeLeft auf den aktuellen Wert im Input-Feld, falls der Timer nicht schon lief
        if (timeLeft === undefined || timeLeft <= 0) {
            initialTimeSet = parseInt(minutesInput.value) * 60;
            timeLeft = initialTimeSet;
        }


        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                isTimerRunning = false;
                startStopButton.textContent = 'Start';
                timerDisplay.classList.add('timer-ended');
                timerGong.play().catch(error => console.error("Audio-Wiedergabefehler:", error)); // Fehlerbehandlung für Audio
                // Hier könnte eine visuelle Hervorhebung oder ein Gong-Sound abgespielt werden
                timeLeft = 0; // Sicherstellen, dass es nicht negativ wird
                updateTimerDisplay(); // Anzeige auf 00:00 setzen
            }
        }, 1000);
    }

    function stopTimer() {
        if (!isTimerRunning) return;
        clearInterval(timerInterval);
        isTimerRunning = false;
        startStopButton.textContent = 'Start';
    }

    function resetTimer() {
        stopTimer();
        timeLeft = initialTimeSet; // Zurücksetzen auf die zuletzt gesetzte Zeit
        minutesInput.value = Math.floor(initialTimeSet / 60); // Input-Feld aktualisieren
        updateTimerDisplay();
        timerDisplay.classList.remove('timer-ended');
    }

    function setTimerDuration(minutes) {
        stopTimer();
        initialTimeSet = minutes * 60;
        timeLeft = initialTimeSet;
        minutesInput.value = minutes;
        updateTimerDisplay();
        timerDisplay.classList.remove('timer-ended');
    }

    startStopButton.addEventListener('click', () => {
        if (isTimerRunning) {
            stopTimer();
        } else {
            // Stelle sicher, dass die Zeit vom Input-Feld genommen wird, wenn der Timer neu gestartet wird
            initialTimeSet = parseInt(minutesInput.value) * 60;
            if (timeLeft === undefined || timeLeft <= 0) { // Nur setzen, wenn der Timer nicht pausiert wurde
                timeLeft = initialTimeSet;
            }
            startTimer();
        }
    });

    resetButton.addEventListener('click', resetTimer);

    minutesInput.addEventListener('change', () => {
        if (!isTimerRunning) { // Zeit nur anpassen, wenn der Timer nicht läuft
            const newMinutes = parseInt(minutesInput.value);
            if (newMinutes > 0) {
                initialTimeSet = newMinutes * 60;
                timeLeft = initialTimeSet;
                updateTimerDisplay();
                timerDisplay.classList.remove('timer-ended');
            } else {
                minutesInput.value = Math.floor(initialTimeSet / 60); // Ungültige Eingabe zurücksetzen
            }
        }
    });

    setTimer15Button.addEventListener('click', () => setTimerDuration(15));
    setTimer45Button.addEventListener('click', () => setTimerDuration(45));

    timerPlus5Button.addEventListener('click', () => {
        const currentMinutes = parseInt(minutesInput.value);
        setTimerDuration(currentMinutes + 5);
    });

    timerMinus5Button.addEventListener('click', () => {
        const currentMinutes = parseInt(minutesInput.value);
        if (currentMinutes > 5) {
            setTimerDuration(currentMinutes - 5);
        } else {
            setTimerDuration(1); // Mindestens 1 Minute
        }
    });

    // Initialen Timer-Wert setzen
    timeLeft = initialTimeSet;
    updateTimerDisplay();
    // Standardmäßig das erste Ritual anzeigen (optional) oder Willkommenstext
    // displayRitual('sprint-planning'); // Oder leer lassen für Willkommenstext
});