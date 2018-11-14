/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 *
 * The tabs used by the Log details page.
 */

import * as m from 'mithril';
import MarkdownViewer from '../components/MarkdownViewer';
import { ModalBody } from '../interfaces/ModalBody';

const MarkdownHelpText: ModalBody = {
    text: `Jiskefet uses markdown for text formatting and editing.
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

col1|col2|col3
----|----|----|
bla | bla | bla|
    `,
    content: (text?: string): JSX.Element => (
        text
            ? <MarkdownViewer key={'MarkdownHelpText'} content={text} />
            : (
                <div>
                    <a
                        href={'https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet'}
                        target="_blank"
                    >
                        Markdown help
                    </a>
                </div>
            )
    )

};

type MarkdownHelpText = typeof MarkdownHelpText;
export default MarkdownHelpText;
