# Storage Mock

> In memory representation of Storage Interface

100% compliant to TypeScript's `Storage` interface.
This library makes use of ES2015 `Proxy` and `Map`, polyfills may be required.

## Get it
```sh
yarn add --dev mock-storage
# or
npm install --save-dev mock-storage
```

## API and Usage

### `mockStorage(map?: Map<string, string>): Storage`

Creates an in-memory version of LocalStorage, optionally with starting data.

```typescript
import { mockStorage } from 'mock-storage'

const storage = mockStorage()

// set item
storage.setItem('foo', 'bar')
// get item
console.log(storage.getItem('foo')) // -> bar

// Using property access
storage.foo = 'baz'
console.log(storage.foo) // -> baz

```