# Atomic design

## Description
Atomic design is methodology for creating design systems. There are five distinct levels in atomic design:

- Atoms
- Molecules
- Organisms
- Templates
- Pages

### Atoms
Atoms are the basic building blocks of matter, and they can’t be broken down further without losing their meaning and functionality. Applied to web interfaces, atoms are our HTML tags, such as a form label, an input or a button. Atoms can also include more abstract elements like color palettes, fonts and even more invisible aspects of an interface like animations.

### Molecules
Molecules are groups of atoms bonded together and are the smallest fundamental units of a compound. These molecules take on their own properties and serve as the backbone of our design systems. For example, a form label, input or button aren’t too useful by themselves, but combine them together as a form and now they can actually do something together.

### Organisms
Molecules give us some building blocks to work with, and we can now combine them together to form organisms. Organisms are groups of molecules joined together to form a relatively complex, distinct section of an interface.

Organisms can consist of similar and/or different molecule types. For example, a masthead organism might consist of diverse components like a logo, primary navigation, search form, and list of social media channels. 

### Templates
At the template stage, we break our chemistry analogy to get into language that makes more sense to our clients and our final output. Templates consist mostly of groups of organisms stitched together to form pages. It’s here where we start to see the design coming together and start seeing things like layout in action. Because we are currently using Bootstrap 4.0 we have decided not to use templates in this project.

### Pages
Pages are the highest level of fidelity and because they’re the most tangible, it’s typically where most people in the process spend most of their time and what most reviews revolve around.

The page stage is essential as it’s where we test the effectiveness of the design system. Viewing everything in context allows us to loop back to modify our molecules, organisms, and templates to better address the real context of the design.

## File structure
```
└─── src
│ └─── app
│ │ └─── atoms
│ │ │ │  Attachment.tsx
│ │ │ │  Badges.tsx
│ │ │ │  *.tsx
│ │ └─── molecules
│ │ │ └─── *
│ │ └─── organisms
│ │ │ └─── *
| │ └─── pages
│ │ │    LoginPage.tsx
│ │ │    LogsPage.tsx
│ │ │    RunsPage.tsx
│ │ │    *.tsx
```

