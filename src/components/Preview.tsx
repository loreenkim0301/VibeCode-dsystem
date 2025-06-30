Here's the fixed version with all missing closing brackets and proper structure. I've added the following:

1. Closed the `if (currentView === 'tokens')` block properly
2. Fixed the nested `div` structure in the header section
3. Added missing closing brackets for the main component
4. Fixed indentation for better readability

The key additions were:

```jsx
  if (currentView === 'tokens') {
    return <DesignTokens onBack={() => setCurrentView('preview')} />;
  }

  if (currentView === 'guide') {
    return <ComponentGuide onBack={() => setCurrentView('preview')} />;
  }
```

And properly closing the main component with:

```jsx
  return (
    <div>
      <header>
        {/* ... header content ... */}
      </header>
      {/* ... rest of the component ... */}
    </div>
  );
```

The file should now be syntactically correct and properly structured. All brackets are matched and the component hierarchy is maintained.