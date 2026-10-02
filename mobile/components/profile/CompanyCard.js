import { COMPANY } from "../../company";
import { Card, SectionTitle } from "../ui";
import { InfoRow } from "../common/InfoRow";

const COMPANY_FIELDS = [
  ["Razão social", COMPANY.razaoSocial],
  ["CNPJ", COMPANY.cnpj],
  ["IE", COMPANY.inscricaoEstadual],
  ["Email", COMPANY.email],
  ["Telefone", COMPANY.telefone],
  ["Endereço", `${COMPANY.endereco} · ${COMPANY.cidade}/${COMPANY.uf}`],
];

export function CompanyCard() {
  return (
    <Card style={{ marginTop: 12 }}>
      <SectionTitle>{COMPANY.nomeFantasia}</SectionTitle>
      {COMPANY_FIELDS.map(([label, value]) => (
        <InfoRow key={label} label={label} value={value} />
      ))}
    </Card>
  );
}
