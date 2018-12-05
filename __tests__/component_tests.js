/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

describe('<Attachment />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Attachment attachTo={'log'} isExistingItem={false} hideImagePreview='false'/>)
      .toJSON();
    expect(tree).toMatchInlineSnapshot();
  });
});

describe('<Badges />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Badges filters={} onEvent={(key) => {}} onEventAll={() => {}} ignoredFilters={['thing', 'anotherthing']}/>)
      .toJSON();
    expect(tree).toMatchInlineSnapshot();
  });
});
