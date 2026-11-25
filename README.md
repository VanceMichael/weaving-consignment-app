# 织锦寄售的作品贡献与渠道收益解释

这是 织锦寄售的作品贡献与渠道收益解释 的本地数据项目，使用合成业务资料。资料字典见 [资料说明](data/资料说明.md)，原始记录位于 `data/observations.json`。

当前可运行的是资料格式检查工具和资料读取接口；经营分析、业务操作和结果查询尚未提供。格式检查通过仅表示 JSON 与身份结构可用，不表示业务资料已被核实，也不代表分析结论成立。

使用 Node.js 22。项目已锁定 Ajv、simple-statistics 与 seedrandom，分别提供格式校验、通用统计原语与可复现随机数，业务口径不由这些依赖预先决定。

```sh
npm ci --ignore-scripts
npm run inspect
npm test
```

`npm test` 检查当前资料的可读性、身份重复与无效结构拒绝。它不会运行尚未提供的分析应用。后续产品入口和使用方法应随实际能力维护。

容器运行当前资料工具：

```sh
docker build -t weaving-consignment:local .
docker run --rm weaving-consignment:local
```

容器默认运行格式检查；可在镜像名后指定 `npm test` 检查资料工具。全部文件使用 UTF-8，资料中时区与量纲见字典。
