/* eslint-disable @typescript-eslint/no-empty-interface */

type CommonMeasure<Fraction extends boolean = true> = {
  decimal: number;
  digital: string;
  hours: number;
  minutes: number;
  text: string;
  total_seconds: number;
} & (Fraction extends true
  ? { name: string; percent: number; seconds: number }
  : Record<string, never>);

interface Category extends CommonMeasure {}
interface Dependency extends CommonMeasure {}
interface Editors extends CommonMeasure {}
interface Language extends CommonMeasure {}
interface Machine extends CommonMeasure {
  machine_name_id: string;
}
interface OperatingSystem extends CommonMeasure {}
interface Project extends CommonMeasure {}
interface Range {
  date: string;
  end: Date;
  start: Date;
  text: string;
  timezone: string;
}

interface Branch extends CommonMeasure {}

interface Entity extends CommonMeasure {
  project_root_count: any;
  type: string;
}

declare interface Status {
  cached_at?: string;
  data: {
    categories: Category[];
    dependencies: Dependency[];
    editors: Editors[];
    grand_total: CommonMeasure<false>;
    languages: Language[];
    machines: Machine[];
    operating_systems: OperatingSystem[];
    projects: Project[];
    range: Range;
  };
  has_team_features?: boolean;
}

declare interface ProjectData {
  data: {
    badge: null;
    color: null;
    created_at: Date;
    has_public_url: boolean;
    human_readable_last_heartbeat_at: string;
    id: string;
    last_heartbeat_at: Date;
    name: string;
    repository: null;
    url: string;
    urlencoded_name: string;
  };
}

declare interface DailyAverage {
  days_including_holidays: number;
  days_minus_holidays: number;
  holidays: number;
  seconds: number;
  seconds_including_other_language: number;
  text: string;
  text_including_other_language: string;
}

declare interface Summary {
  cumulative_total: CommonMeasure<false>;
  daily_average: DailyAverage;
  data: {
    branches: Branch[];
    categories: Category[];
    dependencies: Dependency[];
    editors: Editor[];
    entities: Entity[];
    grand_total: CommonMeasure<false>;
    languages: Language[];
    machines: Machine[];
    operating_systems: OperatingSystem[];
    projects: Project[];
    range: Range;
  }[];
  end: string;
  start: string;
}
