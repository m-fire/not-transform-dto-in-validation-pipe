export abstract class Messages {
    static readonly DONE = '되었습니다.' as const
    static readonly UNABLE = '할 수 없습니다.' as const
    static readonly NO = '아닙니다.' as const
    static readonly NOT = '않습니다.' as const
    static readonly DIDN_T = '않았습니다.' as const
    static readonly DOESN_T_EXISTS = '없습니다.' as const
    static readonly PROBLEM = '문제입니다.' as const
    static readonly REQUIRE_VALUE = '필수입니다.' as const
    static readonly REQUIRE_INPUT = '입력해주세요.' as const
    static readonly REQUIRE_SELECT = '선택해주세요.' as const
    static readonly NOT_FOUND = '찾을 수 없습니다.' as const
    static readonly DUPLICATED = '중복되었습니다.' as const
}

export abstract class InitialValue {
    static readonly NUMBER = -1 as const
    static readonly STRING = '' as const
    static readonly ULID_STRING = '00000000000000000000000000' as const
    static readonly MILLISECONDS = 1000000000000 as const
}
