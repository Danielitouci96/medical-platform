// ============================================================================
// @medical/design-system — PUBLIC API
// ============================================================================
// This is the SINGLE entry point for consuming applications and micro
// frontends. Applications MUST import only from '@medical/design-system' and
// never reach into internal files (e.g. src/components/...).
//
//   import { Button, Input, DataTable } from '@medical/design-system';
//   import '@medical/design-system/styles.css';
//
// For tree-shaking, everything is re-exported here. Importing the package also
// bundles the compiled stylesheet (see styles/index.scss).
// ============================================================================

// Styles are bundled with the library so consumers get them automatically.
import './styles/index.scss';

// ============================================================================
// Icons
// ============================================================================
export { Icon } from './icons/Icon';
export type { IconName, IconProps, IconSize } from './icons/Icon';

// ============================================================================
// Primitives (layout)
// ============================================================================
export { Box } from './primitives/Box/Box';
export type { BoxProps } from './primitives/Box/Box';
export { Stack } from './primitives/Stack/Stack';
export type { StackProps } from './primitives/Stack/Stack';
export { Inline } from './primitives/Inline/Inline';
export type { InlineProps } from './primitives/Inline/Inline';
export { Grid } from './primitives/Grid/Grid';
export type { GridProps } from './primitives/Grid/Grid';
export { Container } from './primitives/Container/Container';
export type { ContainerProps } from './primitives/Container/Container';
export { Text } from './primitives/Text/Text';
export type { TextProps, TextTone, TextSize, TextWeight } from './primitives/Text/Text';
export { Heading } from './primitives/Heading/Heading';
export type { HeadingProps, HeadingSize, HeadingLevel } from './primitives/Heading/Heading';
export { Link } from './primitives/Link/Link';
export type { LinkProps } from './primitives/Link/Link';
export { Divider } from './primitives/Divider/Divider';
export type { DividerProps } from './primitives/Divider/Divider';

// ============================================================================
// Buttons
// ============================================================================
export { Button } from './components/Button/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button/Button';
export { IconButton } from './components/IconButton/IconButton';
export type { IconButtonProps } from './components/IconButton/IconButton';
export { ButtonGroup } from './components/ButtonGroup/ButtonGroup';
export type { ButtonGroupProps } from './components/ButtonGroup/ButtonGroup';

// ============================================================================
// Forms
// ============================================================================
export { FormField } from './components/FormField/FormField';
export type { FormFieldProps, FieldValidationState } from './components/FormField/FormField';
export { Label } from './components/Label/Label';
export type { LabelProps } from './components/Label/Label';
export { Input } from './components/Input/Input';
export type { InputProps, InputValidationState, InputSize } from './components/Input/Input';
export { Textarea } from './components/Textarea/Textarea';
export type { TextareaProps } from './components/Textarea/Textarea';
export { PasswordInput } from './components/PasswordInput/PasswordInput';
export type { PasswordInputProps } from './components/PasswordInput/PasswordInput';
export { SearchInput } from './components/SearchInput/SearchInput';
export type { SearchInputProps } from './components/SearchInput/SearchInput';
export { NumberInput } from './components/NumberInput/NumberInput';
export type { NumberInputProps } from './components/NumberInput/NumberInput';
export { Select, SelectItem } from './components/Select/Select';
export type { SelectProps, SelectItemProps } from './components/Select/Select';
export { MultiSelect } from './components/MultiSelect/MultiSelect';
export type { MultiSelectProps, MultiSelectOption } from './components/MultiSelect/MultiSelect';
export { Combobox } from './components/Combobox/Combobox';
export type { ComboboxProps, ComboboxOption } from './components/Combobox/Combobox';
export { Checkbox } from './components/Checkbox/Checkbox';
export type { CheckboxProps } from './components/Checkbox/Checkbox';
export { RadioGroup } from './components/Radio/Radio';
export type { RadioGroupProps, RadioItemProps } from './components/Radio/Radio';
export { Switch } from './components/Switch/Switch';
export type { SwitchProps } from './components/Switch/Switch';
export { Slider } from './components/Slider/Slider';
export type { SliderProps } from './components/Slider/Slider';

// ============================================================================
// Feedback / Overlay
// ============================================================================
export { Alert } from './components/Alert/Alert';
export type { AlertProps, AlertTone, AlertVariant } from './components/Alert/Alert';
export { ToastProvider, ToastViewport, Toast } from './components/Toast/Toast';
export type { ToastProps, ToastTone, ToastViewportProps, ToastProviderProps } from './components/Toast/Toast';
export { Spinner } from './components/Spinner/Spinner';
export type { SpinnerProps, SpinnerSize } from './components/Spinner/Spinner';
export { Skeleton } from './components/Skeleton/Skeleton';
export type { SkeletonProps } from './components/Skeleton/Skeleton';
export { Progress } from './components/Progress/Progress';
export type { ProgressProps } from './components/Progress/Progress';
export { Modal, ConfirmDialog } from './components/Modal/Modal';
export type { ModalProps, ModalSize, ConfirmDialogProps } from './components/Modal/Modal';
export { Drawer } from './components/Drawer/Drawer';
export type { DrawerProps, DrawerSide, DrawerSize } from './components/Drawer/Drawer';
export { Popover } from './components/Popover/Popover';
export type { PopoverProps } from './components/Popover/Popover';
export { Tooltip, TooltipProvider } from './components/Tooltip/Tooltip';
export type { TooltipProps, TooltipSide, TooltipProviderProps } from './components/Tooltip/Tooltip';
export {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuItemShortcut,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from './components/DropdownMenu/DropdownMenu';
export type { DropdownMenuProps, DropdownMenuItemProps, DropdownMenuCheckboxItemProps } from './components/DropdownMenu/DropdownMenu';

// ============================================================================
// Data display
// ============================================================================
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './components/Card/Card';
export type { CardProps, CardVariant, CardHeaderProps, CardTitleProps } from './components/Card/Card';
export { Badge } from './components/Badge/Badge';
export type { BadgeProps, BadgeTone, BadgeVariant, BadgeSize } from './components/Badge/Badge';
export { Tag } from './components/Tag/Tag';
export type { TagProps } from './components/Tag/Tag';
export { Chip } from './components/Chip/Chip';
export type { ChipProps, ChipVariant, ChipSize } from './components/Chip/Chip';
export { Avatar } from './components/Avatar/Avatar';
export type { AvatarProps, AvatarSize } from './components/Avatar/Avatar';
export { StatusIndicator } from './components/StatusIndicator/StatusIndicator';
export type { StatusIndicatorProps, StatusTone } from './components/StatusIndicator/StatusIndicator';

// ============================================================================
// Tables
// ============================================================================
export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from './components/DataTable/Table';
export type { TableProps } from './components/DataTable/Table';
export { DataTable } from './components/DataTable/DataTable';
export type {
  DataTableProps,
  DataTableColumn,
  DataTableSortState,
  DataTableSelection,
} from './components/DataTable/DataTable';

// ============================================================================
// Pagination
// ============================================================================
export { Pagination } from './components/Pagination/Pagination';
export type { PaginationProps } from './components/Pagination/Pagination';

// ============================================================================
// Filters
// ============================================================================
export {
  FilterBar,
  FilterButton,
  FilterChip,
  ActiveFilters,
  SearchFilter,
  SelectFilter,
  MultiSelectFilter,
  DateFilter,
  DateRangeFilter,
  NumberRangeFilter,
} from './components/FilterBar';
export type {
  FilterBarProps,
  FilterButtonProps,
  FilterChipProps,
  ActiveFiltersProps,
  SearchFilterProps,
  SelectFilterProps,
  MultiSelectFilterProps,
  DateFilterProps,
  DateRangeFilterProps,
  NumberRangeFilterProps,
} from './components/FilterBar';

// ============================================================================
// Navigation
// ============================================================================
export { Navbar, NavbarLink } from './components/Navbar/Navbar';
export type { NavbarProps, NavbarLinkProps } from './components/Navbar/Navbar';
export { Sidebar } from './components/Sidebar/Sidebar';
export type { SidebarProps, SidebarItemDef } from './components/Sidebar/Sidebar';
export { Tabs } from './components/Tabs/Tabs';
export type { TabsProps, TabDef } from './components/Tabs/Tabs';
export { Stepper } from './components/Stepper/Stepper';
export type { StepperProps, StepperStep } from './components/Stepper/Stepper';
export { Breadcrumb } from './components/Breadcrumb/Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem } from './components/Breadcrumb/Breadcrumb';

// ============================================================================
// Date / Time
// ============================================================================
export { Calendar } from './components/Calendar/Calendar';
export type { CalendarProps } from './components/Calendar/Calendar';
export { DatePicker } from './components/DatePicker/DatePicker';
export type { DatePickerProps } from './components/DatePicker/DatePicker';
export { DateRangePicker } from './components/DateRangePicker/DateRangePicker';
export type { DateRangePickerProps, DateRangeValue } from './components/DateRangePicker/DateRangePicker';
export { TimePicker } from './components/TimePicker/TimePicker';
export type { TimePickerProps } from './components/TimePicker/TimePicker';
export { DateTimePicker } from './components/DateTimePicker/DateTimePicker';
export type { DateTimePickerProps, DateTimeValue } from './components/DateTimePicker/DateTimePicker';

// ============================================================================
// Patterns
// ============================================================================
export {
  PageHeader,
  SectionHeader,
  SearchBar,
  ActionBar,
  Toolbar,
  KeyValueList,
  DetailPanel,
} from './patterns/patterns';
export type {
  PageHeaderProps,
  SectionHeaderProps,
  SearchBarProps,
  ActionBarProps,
  ToolbarProps,
  KeyValueListProps,
  DetailPanelProps,
} from './patterns/patterns';

// ============================================================================
// Layouts
// ============================================================================
export {
  Page,
  PageContent,
  TwoColumnLayout,
  ThreeColumnLayout,
  SidebarLayout,
} from './layouts/layouts';
export type {
  PageProps,
  PageHeaderProps as PageHeaderLayoutProps,
  TwoColumnLayoutProps,
  ThreeColumnLayoutProps,
  SidebarLayoutProps,
} from './layouts/layouts';