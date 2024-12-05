import PagePolicy from "src/app/[lang]/page-policy/page-policy";

export default function Page() {
  return (
    <PagePolicy
      requiredPolicies={[
        "ContractService.ContractStore",
        "ContractService.ContractStore.Edit",
        "ContractService.ContractStore.Delete",
        "ContractService.ContractStore.Create",
      ]}
    >
      <div>Stores Page</div>
    </PagePolicy>
  );
}
