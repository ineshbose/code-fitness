\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{prrcs}[2023/02/11]

\DeclareOption{twocolumn}{\setlength{\textwidth}{176mm}
\setlength{\textheight}{257mm}}
\DeclareOption*{\PassOptionsToClass{\CurrentOption}{article}}
\ProcessOptions\relax

\LoadClass[10pt,english,twocolumn]{article}
% \LoadClass{meta}

\renewcommand{\familydefault}{\sfdefault}
\usepackage[T1]{fontenc}
\usepackage[utf8]{inputenc}
\usepackage{pslatex}
\usepackage[english]{babel}
\usepackage{blindtext}
\usepackage{setspace}
\usepackage{hyperref}
\usepackage[defernumbers=true]{biblatex}
\usepackage{csquotes}

\addbibresource{../references/primary.bib}
\addbibresource{../references/secondary.bib}
\addbibresource{../references/tertiary.bib}
\addbibresource{../references/technology.bib}
% \nocite{*}

% Definitions from Simon's mya4.sty
% Set the paper size to A4
\setlength{\paperheight}{297mm}
\setlength{\paperwidth}{210mm}

\newcommand{\settextwidth}[1]{
\setlength{\textwidth}{#1}
\setlength{\oddsidemargin}{\paperwidth}
\addtolength{\oddsidemargin}{-\textwidth}
\setlength{\oddsidemargin}{0.5\oddsidemargin}
\addtolength{\oddsidemargin}{-1in}
}

\newcommand{\settextheight}[1]{
\setlength{\textheight}{#1}
\setlength{\headheight}{0mm}
\setlength{\headsep}{0mm}
\setlength{\topmargin}{\paperheight}
\addtolength{\topmargin}{-\textheight}
\setlength{\topmargin}{0.5\topmargin}
\addtolength{\topmargin}{-1in}
}

\addtolength{\topsep}{-3mm}% space between first item and preceding paragraph.
\addtolength{\partopsep}{-3mm}% extra space added to \topsep when environment starts a new paragraph.
\addtolength{\itemsep}{-5mm}% space between successive items.

% End of Simon's mya4.sty

\usepackage{graphicx}% This is necessary and it must go after mya4
\settextwidth{176mm}
\settextheight{257mm}

\usepackage[usenames,dvipsnames,svgnames,table]{xcolor}
\def\baselinestretch{0.95}

\usepackage[compact]{titlesec}
\titlespacing{\section}{0pt}{*1}{*1}
\titlespacing{\subsection}{0pt}{*1}{*0}
\titlespacing{\subsubsection}{0pt}{*0}{*0}
\titlespacing{\paragraph}{0pt}{*0}{*1}
\titleformat*{\paragraph}{\itshape}{}{}{}

\endinput
