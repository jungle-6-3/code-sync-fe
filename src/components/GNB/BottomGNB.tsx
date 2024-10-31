import { prInfoStore } from "@/stores/github.store";

export const BottomGNB = () => {
  const { prInfo } = prInfoStore();
  return (
    <div className="p-4">
      <h3 className="font-medium">Commit Information</h3>
      <p className="mt-2 text-sm">
        Branch: {prInfo.requireUserInfo.branchName} →{" "}
        {prInfo.requestUserInfo.branchName}
      </p>
    </div>
  );
};
