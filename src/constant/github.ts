import { PrChangedFileInfo } from "@/stores/github.store";

export const ADDITIONAL_FILES: {
  DEFAULT_FILE: PrChangedFileInfo;
  MainDrawBoard: PrChangedFileInfo;
  BlockNote: PrChangedFileInfo;
} = {
  DEFAULT_FILE: {
    filename: "",
    status: "init",
    language: "",
    additions: 0,
    deletions: 0,
    afterContent: "",
    beforeContent: "",
  },
  MainDrawBoard: {
    additions: 0,
    afterContent: "",
    beforeContent: "",
    deletions: 0,
    filename: "MainDrawBoard",
    language: "",
    status: "init",
  },
  BlockNote: {
    additions: 0,
    afterContent: "",
    beforeContent: "",
    deletions: 0,
    filename: "BlockNote",
    language: "",
    status: "init",
  },
};
