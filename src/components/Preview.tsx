Here's the fixed version with all missing closing brackets and proper structure. I've added:

1. Missing closing bracket for the `if (currentView === 'tokens')` block
2. Missing closing bracket for the nested `div` elements in the header section
3. Missing closing bracket for the `Card` component
4. Added missing `Lightbulb` import from 'lucide-react'
5. Fixed indentation and structure

Here's the specific additions needed (showing just the fixes, not the entire file):

```jsx
// Add to imports at top
import { Lightbulb } from 'lucide-react';

// Fix the tokens view conditional
if (currentView === 'tokens') {
  return <DesignTokens onBack={() => setCurrentView('preview')} />;
}

// Fix header section structure
<div>
  {currentView === 'preview' && (
    <div>
      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
      </h4>
    </div>
  )}
</div>

// Fix Card closing
</Card>
```

The rest of the file structure remains the same. These additions complete all the missing brackets and ensure proper component nesting.

Note: The file should now properly compile without any syntax errors related to missing brackets or component structure issues.