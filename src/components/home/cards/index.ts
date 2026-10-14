import AutocompleteCard from './AutocompleteCard.astro';
import CardOutputCard from './CardOutputCard.astro';
import ColumnCard from './ColumnCard.astro';
import CompareCard from './CompareCard.astro';
import ConnectionFieldsCard from './ConnectionFieldsCard.astro';
import ConnectionTestCard from './ConnectionTestCard.astro';
import FilterCard from './FilterCard.astro';
import FindTableCard from './FindTableCard.astro';
import JoinCard from './JoinCard.astro';
import KeychainCard from './KeychainCard.astro';
import PipelineStageCard from './PipelineStageCard.astro';
import QueryResultCard from './QueryResultCard.astro';
import RelationCard from './RelationCard.astro';
import ReviewCard from './ReviewCard.astro';
import RowMenuCard from './RowMenuCard.astro';
import ShellResultCard from './ShellResultCard.astro';
import ShortcutCard from './ShortcutCard.astro';

// The popup card component for each CARD_KINDS key (spec 0003, AC-19), shared by
// Home's feature panels and the features page sections (spec 0008, AC-5).
export const cardComponents = {
  filter: FilterCard,
  review: ReviewCard,
  rowMenu: RowMenuCard,
  autocomplete: AutocompleteCard,
  queryResult: QueryResultCard,
  column: ColumnCard,
  relation: RelationCard,
  findTable: FindTableCard,
  join: JoinCard,
  cardOutput: CardOutputCard,
  shortcut: ShortcutCard,
  compare: CompareCard,
  connectionFields: ConnectionFieldsCard,
  connectionTest: ConnectionTestCard,
  keychain: KeychainCard,
  pipelineStage: PipelineStageCard,
  shellResult: ShellResultCard,
} as const;
