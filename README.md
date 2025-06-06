# Scrum Website

Dies ist eine einfache Webseite für die Steuerung von Scrum-Ritualen im Unterricht. Sie dient als interaktive Übersicht über Scrum-Rituale, deren To-Dos und beinhaltet einen dynamischen Timer zur Unterstützung der Zeitsteuerung im Unterricht.

## Zweck der Seite

Diese Webseite wurde entwickelt, um Schülerinnen und Schülern im Berufskolleg einen klaren und strukturierten Einblick in den Scrum-Prozess zu geben. Jedes Scrum-Ritual (Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospektive) wird mit einer kurzen Beschreibung und den jeweiligen Aufgaben für Schüler und Lehrkräfte in Form von Widgets dargestellt. Ein integrierter, anpassbarer Timer hilft dabei, die Zeitvorgaben der einzelnen Rituale einzuhalten.

Zusätzlich gibt es einen Glossar-Bereich, der die wichtigsten Scrum-Begriffe erklärt.

## Technologien

* HTML5
* CSS3
* JavaScript (Vanilla JS)

## Struktur der Dateien

* `index.html`: Enthält die Hauptstruktur der Webseite und die Navigation.
* `style.css`: Verantwortlich für das gesamte Styling und das responsive Design der Seite.
* `script.js`: Steuert die Interaktivität, das Laden der Ritual-Inhalte und die Funktionalität des Timers.
* `gong.mp3`: Wird vom Timer als akustisches Signal verwendet, wenn die Zeit abgelaufen ist.

## Nutzung im Unterricht

1.  Öffnen Sie die `index.html` in einem Webbrowser oder rufen Sie die gehostete Seite auf (z. B. Github Pages).
2.  Nutzen Sie die Navigationsleiste, um zwischen den verschiedenen Scrum-Ritualen zu wechseln.
3.  Passen Sie den Timer unten rechts an die Bedürfnisse des jeweiligen Rituals an (Zeit einstellen, Start, Stopp, Reset).

## Anpassung

* **Inhalte der Rituale:** Die Texte für Beschreibungen und To-Do-Listen können direkt in der `ritualsData`-Variable in der Datei `script.js` angepasst werden.
* **Styling:** Farben, Schriftarten und Layout können in der `style.css` modifiziert werden.
* **Timer-Sound:** Ersetzen Sie die Datei `gong.mp3` durch einen eigenen Sound und passen Sie ggf. den Dateinamen im HTML (`<audio id="timer-gong" src="DEINE_SOUND_DATEI.mp3">`) an.

## Mitwirkende / Autor

* [Kevin Elmer / Heinrich-Hertz-Europakolleg Bonn]
