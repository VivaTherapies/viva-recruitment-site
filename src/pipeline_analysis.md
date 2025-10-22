# Viva Recruitment Pipeline - Current State Analysis

## Current Issues Identified

### 1. Pipeline Visualization Problems
- **Duplicate Pipeline Display**: The pipeline appears twice on the page (once at top, once at bottom)
- **Poor Visual Hierarchy**: The pipeline stages are displayed horizontally with numbered circles, but the layout is cramped
- **Limited Stage Information**: Only shows stage number, name, duration, and candidate count
- **Difficult to Track Progress**: Candidates are listed within each stage column, but it's hard to see movement between stages
- **No Clear Status Indicators**: Status badges (pending, scheduled, in-progress, induction) are small and not prominent

### 2. Candidate List Issues
- **Redundant Information**: Candidate list appears both in pipeline view and as separate cards below
- **Poor Spacing**: Candidate cards are tightly packed with minimal visual separation
- **Inconsistent Stage Display**: Stage numbers (Stage 1, Stage 2, etc.) don't clearly map to pipeline stage names
- **Limited Quick Actions**: Only "View Details" and "Email" buttons available

### 3. Overall UX Problems
- **Information Overload**: Too much information displayed at once without clear prioritization
- **No Drag-and-Drop**: Cannot move candidates between stages visually
- **Limited Filtering**: Only basic status filter available
- **No Visual Progress Indicators**: No progress bars or completion percentages per candidate

## Recommended Improvements

### 1. Single, Clear Pipeline View
- Remove duplicate pipeline display
- Implement a Kanban-style board with vertical columns
- Add drag-and-drop functionality to move candidates between stages
- Use color-coded status indicators

### 2. Enhanced Candidate Cards
- Larger, more readable cards with better spacing
- Progress indicators showing completion percentage
- Quick action buttons (Email, Move Stage, Archive)
- Visual status badges with clear colors

### 3. Better Information Architecture
- Collapsible pipeline sections
- Summary statistics at the top
- Clear stage names instead of just numbers
- Visual flow indicators showing candidate movement

### 4. EmailJS Integration Points
- Email button on each candidate card
- Bulk email functionality for stage-based communication
- Email templates for different stages
- Email history tracking

