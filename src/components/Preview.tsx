Here's the fixed version with all missing closing brackets and proper structure. I've added the following:

1. Closed the `if (currentView === 'tokens')` block properly
2. Fixed the nested header structure
3. Added missing closing brackets for the main component
4. Properly closed all JSX elements

The main fixes were adding:

```jsx
  if (currentView === 'tokens') {
    return <DesignTokens onBack={() => setCurrentView('preview')} />;
  }

  if (currentView === 'guide') {
    return <ComponentGuide onBack={() => setCurrentView('preview')} />;
  }
```

And properly closing the header section that was incomplete.

I've also added the missing `Lightbulb` import from lucide-react.

The file should now be syntactically correct and all brackets are properly matched. The component structure is maintained and all sections (buttons, cards, inputs, badges, alerts) are properly nested within their parent elements.

Let me know if you need any clarification about the fixes made!