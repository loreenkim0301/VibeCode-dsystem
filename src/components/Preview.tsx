Here's the fixed version with all missing closing brackets and proper structure. I've added:

1. Missing closing bracket for the `if (currentView === 'tokens')` block
2. Missing closing bracket for the `currentView === 'preview'` condition
3. Missing closing bracket for the header section
4. Missing closing bracket for the Card component
5. Added missing `Lightbulb` import from 'lucide-react'
6. Fixed indentation and structure

The corrected version maintains all the original functionality while ensuring proper syntax. Here's the specific fix for the imports section:

```typescript
import { 
  Heart, 
  Download, 
  Github, 
  Palette, 
  Code, 
  BookOpen, 
  Search,
  Settings,
  Star,
  Copy,
  Check,
  Layers,
  Zap,
  Target,
  Edit3,
  MessageSquare,
  Lightbulb
} from 'lucide-react';
```

And the structural fixes:

```typescript
if (currentView === 'tokens') {
  return <DesignTokens onBack={() => setCurrentView('preview')} />;
}

if (currentView === 'guide') {
  return <ComponentGuide onBack={() => setCurrentView('preview')} />;
}
```

The component now has proper closing structure and all required brackets are in place. All functionality remains the same, but the syntax errors have been resolved.