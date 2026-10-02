export { BackLink } from "./common/BackLink";
export { ChipGroup } from "./common/ChipGroup";
export { EmailField } from "./common/EmailField";
export { EmptyState } from "./common/EmptyState";
export { FormScroll } from "./common/FormScroll";
export { InfoRow } from "./common/InfoRow";
export { Logo } from "./common/Logo";
export { PasswordField } from "./common/PasswordField";
export { PickerField } from "./common/PickerField";
export { ScreenHeader } from "./common/ScreenHeader";
export { SwitchRow } from "./common/SwitchRow";
export { TextLink } from "./common/TextLink";
export { TabBar } from "./navigation/TabBar";
export { NotificationItem } from "./notifications/NotificationItem";
export { CompanyCard } from "./profile/CompanyCard";
export { UserSummary } from "./profile/UserSummary";
export { AssignAgent } from "./tickets/AssignAgent";
export { SatisfactionRating } from "./tickets/SatisfactionRating";
export { TicketCard } from "./tickets/TicketCard";
export { TicketHistory } from "./tickets/TicketHistory";
export { TicketPeople } from "./tickets/TicketPeople";
export { NewUserForm } from "./users/NewUserForm";
export { UserCard } from "./users/UserCard";
export * from "./ui";

/*
  Só pra exportar e usar em outras pastas os componentes, nosso barrel
  Para não ter que fazer isso:
    import { EmptyState } from "../components/common/EmptyState";
    import { ErrorText } from "../components/common/ErrorText";
  Ai fazemos a criação do index.js e podemos fazer isso
    import { EmptyState, ErrorText } from "../components";
*/
