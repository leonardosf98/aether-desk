import { useMemo, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { COMPANY } from "../company";
import { CATEGORY_LABEL, PRIORITY_META, STATUS_META } from "../theme";
import {
  AssignAgent,
  BackLink,
  Badge,
  Button,
  Card,
  ChipGroup,
  EmptyState,
  Field,
  Muted,
  PickerField,
  SatisfactionRating,
  Screen,
  ScreenHeader,
  TicketCard,
  TicketHistory,
  TicketPeople,
  Title,
  Chip,
  Fab,
  FieldLabel,
  Segmented,
} from "../components";

const PRIORITY_OPTIONS = Object.entries(PRIORITY_META).map(([key, meta]) => [key, meta.label]);
const STATUS_OPTIONS = Object.entries(STATUS_META).map(([key, meta]) => [key, meta.label]);
const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABEL);

const FILTER_OPTIONS = [
  ["abertos", "Em aberto"],
  ["resolvidos", "Resolvidos"],
  ["cancelados", "Cancelados"],
  ["todos", "Todos"],
];

const PRIORITY_FILTER_OPTIONS = [
  ["todas", "Todas"],
  ...Object.entries(PRIORITY_META).map(([key, meta]) => [key, meta.label]),
];

function matchesFilter(ticket, filter) {
  if (filter === "todos") return true;
  if (filter === "resolvidos") return ticket.status === "resolvido";
  if (filter === "cancelados") return ticket.status === "cancelado";
  return ticket.status !== "resolvido" && ticket.status !== "cancelado";
}

function matchesPriority(ticket, priority) {
  return priority === "todas" || ticket.priority === priority;
}

export function TicketListScreen({
  title,
  subtitle,
  tickets,
  onOpen,
  onCreate,
  empty,
}) {
  const [filter, setFilter] = useState("abertos");
  const [priority, setPriority] = useState("todas");

  const visible = useMemo(
    () =>
      tickets.filter(
        (ticket) =>
          matchesFilter(ticket, filter) && matchesPriority(ticket, priority),
      ),
    [tickets, filter, priority],
  );

  return (
    <Screen>
      <ScreenHeader title={title} subtitle={subtitle} />
      <View style={{ marginBottom: 10 }}>
        <FieldLabel>Situação</FieldLabel>
        <Segmented options={FILTER_OPTIONS} value={filter} onChange={setFilter} />
        <FieldLabel style={{ marginTop: 12 }}>Prioridade</FieldLabel>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 2 }}
        >
          {PRIORITY_FILTER_OPTIONS.map(([key, label]) => (
            <Chip
              key={key}
              label={label}
              selected={priority === key}
              onPress={() => setPriority(key)}
            />
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={visible}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <TicketCard ticket={item} onPress={() => onOpen(item)} />}
        ListEmptyComponent={
          <EmptyState>
            {filter === "resolvidos"
              ? "Nenhum chamado resolvido ainda."
              : filter === "cancelados"
                ? "Nenhum chamado cancelado."
                : empty}
          </EmptyState>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 96 }}
      />
      {onCreate ? <Fab onPress={onCreate} /> : null}
    </Screen>
  );
}

export function NewTicketScreen({ onSave, onBack, loading }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("media");
  const [category, setCategory] = useState("tecnico");
  return (
    <Screen>
      <BackLink onPress={onBack} />
      <ScreenHeader
        title="Abrir chamado"
        subtitle={`A equipe de ${COMPANY.nomeFantasia} recebe o pedido na fila.`}
      />
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <Card>
          <Field label="Título" value={title} onChangeText={setTitle} placeholder="Resumo do problema" />
          <Field
            label="Descrição"
            value={description}
            onChangeText={setDescription}
            multiline
            placeholder="O que aconteceu, quando, e o que já tentou."
          />
          <ChipGroup label="Prioridade" options={PRIORITY_OPTIONS} value={priority} onChange={setPriority} />
          <PickerField label="Categoria" options={CATEGORY_OPTIONS} value={category} onChange={setCategory} />
          <Button
            title="Enviar chamado"
            loading={loading}
            onPress={() => onSave({ title, description, priority, category })}
          />
        </Card>
      </ScrollView>
    </Screen>
  );
}

export function TicketDetailScreen({
  ticket,
  events,
  user,
  agents,
  onBack,
  onAssign,
  onStatus,
  onCancel,
  onDelete,
}) {
  const status = STATUS_META[ticket.status] || STATUS_META.aberto;
  const staff = user.role === "admin" || user.role === "atendente";
  return (
    <Screen>
      <BackLink onPress={onBack} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <Badge label={status.label} color={status.color} bg={status.bg} />
        <Title style={{ fontSize: 24, marginTop: 10 }}>{ticket.title}</Title>
        <Muted style={{ marginTop: 8 }}>{ticket.description}</Muted>
        <TicketPeople ticket={ticket} />
        {staff ? (
          <Card style={{ marginTop: 12 }}>
            <AssignAgent agents={agents} agentId={ticket.agentId} onAssign={onAssign} />
            <ChipGroup label="Status" options={STATUS_OPTIONS} value={ticket.status} onChange={onStatus} />
          </Card>
        ) : null}
        {!staff && ticket.status === "aberto" ? (
          <Button title="Cancelar chamado" variant="danger" onPress={onCancel} style={{ marginTop: 12 }} />
        ) : null}
        {user.role === "admin" ? (
          <Button title="Excluir chamado" variant="danger" onPress={onDelete} style={{ marginTop: 12 }} />
        ) : null}
        {ticket.status === "resolvido" && !staff ? <SatisfactionRating key={ticket.id} /> : null}
        <TicketHistory events={events} />
      </ScrollView>
    </Screen>
  );
}
