/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 *
 * This text contains explenation for the markdown editor.
 * It explains the basics of markdown, it also gives a link that
 * redirects to a website with a more detailed explanation.
 */
import { APPLICATION_NAME } from './constants';

const MarkdownHelpText: string =
    `${APPLICATION_NAME} uses markdown for text formatting and editing.
    These are the basic techniques.
    For a more detailed explanation
    [go here](https://guides.github.com/features/mastering-markdown/).

### First Level Header
    Making Scrambled Eggs: A Primer
    ===============================

### Second Level Header
    1.1: Preparation
    ----------------

### Paragraphs
    Add two new lines to start a new paragraph. Crack two eggs into the bowl and whisk.

### Bold
    **Carefully** crack the eggs.

### Emphasis
    Whisk the eggs *vigorously*.

### Lists
    Ingredients:
    - Eggs
    - Oil
    - *Optional:* milk

### Links
    To download a PDF version of the recipe, [click here](https://example.com/scrambled-eggs.pdf).

### Images
    ![The Finished Dish](https://via.placeholder.com/150)

    `;

type MarkdownHelpText = typeof MarkdownHelpText;
export default MarkdownHelpText;
