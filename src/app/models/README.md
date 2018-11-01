# State Management
This app has a single state object (located in State.ts). Everything regarding state should reside in this single object.

## How to use
To use the state in code, only the `State` object should be used. To mutate the state, one can simply overwrite the State object. This should ideally be left to the files in the directory */models*.

An example of using state in a view:

```TSX
import State from '../models/State';

// other code...

view() {
    return (
        <div>
            {State.LogModel.current}
        </div>
    );
}
```