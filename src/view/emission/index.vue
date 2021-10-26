<template>
  <div class="big_box">
    <div class="top">
      <p>{{ $t("Factory_Emission") }}</p>
      <DatePicker
        type="year"
        placeholder="Select year"
        :options="options"
        style="width: 200px"
        v-model="querForm.year"
        format="yyyy"
        @on-change="queryData"
      ></DatePicker>
      <Select
        v-model="querForm.factory"
        style="width: 200px"
        @on-change="queryData"
      >
        <Option
          v-for="(item, index) in productList"
          :value="item.id"
          :key="index"
          >{{ item.name }}</Option
        >
      </Select>
    </div>
    <div class="content_box">
      <div class="left">
        <div class="top">
          <p class="title">{{ $t("Factory_Statistics") }}</p>
          <div class="list">
            <ul>
              <li v-for="(item, index) in topList" :key="index">
                <div class="icon_box">
                  <p :class="'icon icon' + index"></p>
                </div>
                <div class="list_right">
                  <p class="number">{{ item.count }}</p>
                  <p class="number_bottom">{{ item.title }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="bottom">
          <div class="bottom_top">
            <div class="left">
              <p class="title">{{ $t("Emission_History") }}</p>
              <p class="sup_title">
                {{ $t("Based_on_the_average_product_volume") }}
              </p>
            </div>
            <Button
              type="text"
              @click="gotoHitory"
              style="color: #006d80; font-size: 14px; font-weight: 600"
              >{{ $t("Load_More") }}</Button
            >
          </div>
          <div class="bottom_content">
            <div class="canvas_box">
              <div class="top_canvas">
                <div class="left_canvas">
                  <p class="name">{{ $t("Emission") }}</p>
                  <div class="types">
                    <p
                      @click="firstChose('quarter')"
                      :class="firstFilter == 'quarter' ? 'active' : ''"
                    >
                      {{ $t("Quarter") }}
                    </p>
                    <p
                      @click="firstChose('month')"
                      :class="firstFilter == 'month' ? 'active' : ''"
                    >
                      {{ $t("Month") }}
                    </p>
                    <p
                      @click="firstChose('day')"
                      :class="firstFilter == 'day' ? 'active' : ''"
                    >
                      {{ $t("Day") }}
                    </p>
                  </div>
                </div>
                <!-- <div class="right_canvas">
                  <p class="first_p">Emission Scope 1&2</p>
                  <p>Emission Scope 3</p>
                </div> -->
              </div>
              <div>
                <Card shadow>
                  <example
                    style="height: 310px"
                    :xdata="dataChrts.periods"
                    :data1="dataChrts.scope12_sequence"
                    :data2="dataChrts.scope3_sequence"
                  />
                </Card>
              </div>
            </div>
            <div class="canvas_box">
              <div class="top_canvas">
                <div class="left_canvas">
                  <p class="name">{{ $t("Emission") }}</p>
                  <div class="types">
                    <p
                      @click="secondChose('quarter')"
                      :class="secondFilter == 'quarter' ? 'active' : ''"
                    >
                      {{ $t("Quarter") }}
                    </p>
                    <p
                      @click="secondChose('month')"
                      :class="secondFilter == 'month' ? 'active' : ''"
                    >
                      {{ $t("Month") }}
                    </p>
                    <p
                      @click="secondChose('day')"
                      :class="secondFilter == 'day' ? 'active' : ''"
                    >
                      {{ $t("Day") }}
                    </p>
                  </div>
                </div>
                <!-- <div class="right_canvas">
                                    <p>Emission Scope 1&2</p>
                                    <p>Emission Scope 3</p>
                                </div> -->
              </div>
              <Card shadow>
                <chart-bar
                  style="height: 300px"
                  :value="barValue"
                  text="每周用户活跃量"
                  v-if="barValue.length"
                />
              </Card>
            </div>
            <div class="canvas_box">
              <div class="top_canvas">
                <div class="left_canvas">
                  <p class="name">产品碳足迹平均值</p>
                  <div class="types">
                    <p
                      @click="thirdChose('quarter')"
                      :class="thirdFilter == 'quarter' ? 'active' : ''"
                    >
                      {{ $t("Quarter") }}
                    </p>
                    <p
                      @click="thirdChose('month')"
                      :class="thirdFilter == 'month' ? 'active' : ''"
                    >
                      {{ $t("Month") }}
                    </p>
                    <p
                      @click="thirdChose('day')"
                      :class="thirdFilter == 'day' ? 'active' : ''"
                    >
                      {{ $t("Day") }}
                    </p>
                  </div>
                </div>
                <!-- <div class="right_canvas">
                  <p class="first_p">Emission Scope 1&2</p>
                  <p>Emission Scope 3</p>
                </div> -->
              </div>
              <div>
                <Card shadow>
                  <example
                    style="height: 310px"
                    v-if="dataChrts2.product_pcf_sequences.length"
                    :xdata="dataChrts2.periods"
                    :data1="
                      dataChrts2.product_pcf_sequences[0].product_pcf_sequence
                    "
                    :data2="
                      dataChrts2.product_pcf_sequences[1].product_pcf_sequence
                    "
                  />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right_top">
          <p class="title">{{ $t("CO2e_Emission") }}</p>
          <p class="sup_title">{{ $t("Total_Emission") }}</p>
          <p class="title_count">
            <span class="title_add"
              >{{ totalData.pcf_total.toFixed(3) }}kg
            </span>
            <span>CO2e</span>
          </p>
          <!-- <Card shadow> -->
          <chart-pie style="height: 180px" :value="pieData"></chart-pie>
          <!-- </Card> -->
        </div>
        <div class="right_top right_bottom">
          <p class="title">{{ $t("Scope_1_Scope_2_CO2e_Emission") }}</p>
          <p class="sup_title">{{ $t("Total_Emission") }}</p>
          <p class="title_count">
            <span class="title_add">{{ pieData[0].value }}kg </span>
            <span>CO2e</span>
          </p>
          <!-- <Card shadow> -->
          <chart-pie
            style="height: 180px"
            type="pie2"
            :value="pieData2"
          ></chart-pie>
          <!-- </Card> -->
          <div class="right_progress">
            <div class="top">
              <p class="top_left">{{ $t("SMT") }}：{{ pieData2[0].value }}kg</p>
              <p class="top_percent">
                {{
                  pieData[0].value == 0
                    ? "0.000"
                    : (pieData2[0].value / pieData[0].value).toFixed(3) * 100
                }}%
              </p>
            </div>
            <Progress
              :percent="
                pieData[0].value == 0
                  ? 0
                  : (pieData2[0].value / pieData[0].value).toFixed(3) * 100
              "
              hide-info
              status="normal"
            />
          </div>
          <div class="right_progress">
            <div class="top">
              <p class="top_left">{{ $t("THT") }}：{{ pieData2[1].value }}kg</p>
              <p class="top_percent">
                {{
                  pieData[0].value == 0
                    ? "0.000"
                    : (pieData2[1].value / pieData[0].value).toFixed(3) * 100
                }}%
              </p>
            </div>
            <Progress
              :percent="
                pieData[0].value == 0
                  ? 0
                  : (pieData2[1].value / pieData[0].value).toFixed(3) * 100
              "
              hide-info
              status="active"
            />
          </div>
          <div class="right_progress">
            <div class="top">
              <p class="top_left">
                {{ $t("Assembling") }}：{{ pieData2[2].value }}kg
              </p>
              <p class="top_percent">
                {{
                  pieData[0].value == 0
                    ? "0.000"
                    : (pieData2[2].value / pieData[0].value).toFixed(3) * 100
                }}%
              </p>
            </div>
            <Progress
              :percent="
                (pieData[0].value == 0
                  ? 0
                  : pieData2[2].value / pieData[0].value
                ).toFixed(3) * 100
              "
              hide-info
              status="wrong"
            />
          </div>
          <div class="right_progress">
            <div class="top">
              <p class="top_left">
                {{ $t("Public_utilities") }}：{{ pieData2[3].value }}kg
              </p>
              <p class="top_percent">
                {{
                  pieData[0].value == 0
                    ? "0.000"
                    : (pieData2[3].value / pieData[0].value).toFixed(3) * 100
                }}%
              </p>
            </div>
            <Progress
              :percent="
                (pieData[0].value == 0
                  ? 0
                  : pieData2[3].value / pieData[0].value
                ).toFixed(3) * 100
              "
              hide-info
              status="success"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import example from "../single-page/home/example.vue";
import { ChartPie, ChartBar } from "_c/charts";
import {
  getChartData,
  getPcfbyscope,
  getPcfbyprocess,
  getPcfbyproduct,
  getPcfTotal,
} from "@/api/home";
// import { mapMutations, mapActions, mapGetters } from 'vuex';
import mockData from "../../../mock.js";
import mock2Data from "../../../mock2.js";
import mock3Data from "../../../mock3.js";
import toalmock from "../../../totalmock.js";
export default {
  components: {
    example,
    ChartBar,
    ChartPie,
  },
  data() {
    return {
      querForm: {
        year: new Date(),
        factory: "SEWC",
      },
      countData: {},
      topList: [
        { title: this.$t("Modules"), id: 0, count: 0 },
        { title: this.$t("Total_Products"), id: 1, count: 0 },
        { title: this.$t("Total_Components"), id: 2, count: 0 },
        { title: this.$t("Supplies"), id: 3, count: 0 },
      ],
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        },
      },
      pieData: [
        {
          value: 0,
          name: this.$t("Emission_Scope_1_2_C"),
          itemStyle: { color: "#006D80" },
        },
        { value: 0, name: this.$t("Scope3"), itemStyle: { color: "#00D3C9" } },
      ],
      pieData2: [
        { value: 0, name: this.$t("SMT"), itemStyle: { color: "#006D80" } },
        { value: 0, name: this.$t("THT"), itemStyle: { color: "#00D3C9" } },
        {
          value: 0,
          name: this.$t("Assembling"),
          itemStyle: { color: "#A4DC94" },
        },
        {
          value: 0,
          name: this.$t("Public_utilities"),
          itemStyle: { color: "#FFE898" },
        },
      ],
      firstFilter: "day",
      secondFilter: "day",
      thirdFilter: "day",
      dataChrts: {
        periods: [],
        scope12_sequence: [],
        scope3_sequence: [],
      },
      dataChrts2: {
        periods: [],
        product_pcf_sequences: [],
      },
      totalData: {},
      barValue: [],
      productList: [{ name: "SEWC", id: "SEWC" }],
    };
  },
  created() {
    //   面积图
    this.dataChrts = mockData.data;
    var obj = {
      year: this.querForm.year,
      factory: this.querForm.factory,
      frequency: this.firstFilter,
    };

    //   柱状图
    var obj2 = {
      year: this.querForm.year,
      factory: this.querForm.factory,
      frequency: this.secondFilter,
    };
    var valueList = mock3Data.data.periods.map((item, index) => {
      var arr = [];
      arr.push(item);
      arr.push(mock3Data.data.process_pcf_sequence[index].smt);
      arr.push(mock3Data.data.process_pcf_sequence[index].tht);
      arr.push(mock3Data.data.process_pcf_sequence[index].assembling);
      arr.push(mock3Data.data.process_pcf_sequence[index].public);
      //   console.log(arr);
      return arr;
    });
    valueList[0] = [
      "product",
      this.$t("SMT"),
      this.$t("THT"),
      this.$t("Assembling"),
      this.$t("Public_utilities"),
    ];
    // console.log(valueList,"999mocklist")
    this.barValue = valueList;

    //   面积
    this.dataChrts2 = mock2Data.data;
    var obj = {
      year: this.querForm.year,
      factory: this.querForm.factory,
      frequency: this.thirdFilter,
    };
    this.totalData = toalmock.data;
    this.queryData();
  },
  methods: {
    firstChose(type) {
      this.firstFilter = type;
      var obj = {
        year: this.querForm.year.getFullYear(),
        factory: this.querForm.factory,
        frequency: type,
      };
      this.getPcfData(obj);
    },
    secondChose(type) {
      this.secondFilter = type;
      var obj = {
        year: this.querForm.year.getFullYear(),
        factory: this.querForm.factory,
        frequency: type,
      };
      this.getProgressData(obj);
    },
    thirdChose(type) {
      this.thirdFilter = type;
      var obj = {
        year: this.querForm.year.getFullYear(),
        factory: this.querForm.factory,
        frequency: type,
      };
      this.getPcfProduct(obj);
    },
    gotoHitory() {
      this.$router.push("/emission/history");
      console.log(this.$route);
    },
    queryData() {
      var year = this.querForm.year;
      var obj = {
        year: year.getFullYear(),
        factory: this.querForm.factory,
        frequency: this.firstFilter,
      };
      getChartData({ ...obj }).then((res) => {
        if (res.data.code == 200) {
          this.topList[0].count = res.data.data.module_count;
          this.topList[1].count = res.data.data.product_count;
          this.topList[2].count = res.data.data.component_count;
          this.topList[3].count = res.data.data.supplier_count;
        }
      });

      this.getPcfData({
        year: this.querForm.year.getFullYear(),
        factory: this.querForm.factory,
        frequency: this.firstFilter,
      });
      this.getProgressData({
        year: this.querForm.year.getFullYear(),
        factory: this.querForm.factory,
        frequency: this.secondFilter,
      });
      this.getPcfProduct({
        year: this.querForm.year.getFullYear(),
        factory: this.querForm.factory,
        frequency: this.thirdFilter,
      });
      this.getTotalData(year);
    },
    getTotalData(year) {
      var obj = {
        year: year.getFullYear(),
        factory: this.querForm.factory,
        frequency: this.firstFilter,
      };
      getPcfTotal({ ...obj }).then((res) => {
        if (res.data.code == 200) {
          this.totalData = res.data.data;
          console.log(this.totalData, "totalData,jiekou");
          this.pieData[0].value = Number(
            (
              this.totalData.pcf_scope12.smt +
              this.totalData.pcf_scope12.tht +
              this.totalData.pcf_scope12.assembling +
              this.totalData.pcf_scope12.public
            ).toFixed(3)
          );
          this.pieData[1].value = Number(this.totalData.pcf_scope3.toFixed(3));

          this.pieData2[0].value = Number(
            this.totalData.pcf_scope12.smt.toFixed(3)
          );
          this.pieData2[1].value = Number(
            this.totalData.pcf_scope12.tht.toFixed(3)
          );
          this.pieData2[2].value = Number(
            this.totalData.pcf_scope12.assembling.toFixed(3)
          );
          this.pieData2[3].value = Number(
            this.totalData.pcf_scope12.public.toFixed(3)
          );
        } else {
          this.totalData = toalmock;
        }
      });
    },

    getPcfData(obj) {
      getPcfbyscope({ ...obj }).then((res) => {
        if (res.data.code == 200) {
          this.dataChrts = res.data.data;
          // this.$set(this.dataChrts, "periods", res.data.data.periods);
          // this.$set(this.dataChrts,"scope12_sequence",res.data.data.scope12_sequence);
          // this.$set(this.dataChrts,"scope3_sequence",res.data.data.scope3_sequence);
          console.log(this.dataChrts, "接口");
        } else {
          //   面积图
          this.dataChrts = mockData.data;
        }
      });
    },

    getProgressData(obj) {
      getPcfbyprocess({ ...obj }).then((res) => {
        if (res.data.code == 200) {
          var resData = res.data.data;
          console.log(
            resData.periods.length,
            resData.process_pcf_sequence.length,
            "res.data.data.periods,res.data.data.process_pcf_sequence"
          );
          if (resData.periods.length && resData.process_pcf_sequence.length) {
            var valueList = resData.periods.map((item, index) => {
              var arr = [];
              arr.push(item);
              arr.push(resData.process_pcf_sequence[index].smt);
              arr.push(resData.process_pcf_sequence[index].tht);
              arr.push(resData.process_pcf_sequence[index].assembling);
              arr.push(resData.process_pcf_sequence[index].public);
              console.log(arr);
              return arr;
            });
            console.log(valueList, "[]]]-接口返回process=---");
            valueList[0] = [
              "product",
              this.$t("SMT"),
              this.$t("THT"),
              this.$t("Assembling"),
              this.$t("Public_utilities"),
            ];
            this.barValue = valueList;
            console.log(this.barValue, "接口barValue");
          }
        }
      });
    },

    getPcfProduct(obj) {
      getPcfbyproduct({ ...obj }).then((res) => {
        if (res.data.code == 200) {
          this.dataChrts2 = res.data.data;
          // this.$set(this.dataChrts2, "periods", res.data.data.periods);
          // this.$set(this.dataChrts2,"product_pcf_sequences",res.data.data.product_pcf_sequences);
          console.log(this.dataChrts2, "dataChrts2Value");
        } else {
          //   面积图
          this.dataChrts2 = mock2Data.data;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.big_box {
  .top {
    display: flex;
    p {
      color: #11435c;
      font-size: 18px;
    }
    ::v-deep {
      .ivu-select {
        color: #11435c;
        margin-left: 20px;
        .ivu-select-selection {
          border-color: #11435c;
        }
      }
    }
    .ivu-date-picker {
      margin-left: 20px;
      ::v-deep {
        .ivu-date-picker-rel {
          .ivu-input-wrapper {
            .ivu-input-inner-container {
              .ivu-input {
                border-color: #11435c;
              }
            }
          }
        }
      }
    }
  }
  .content_box {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .left {
      width: 75%;
      .top {
        padding: 20px;
        background: #fff;
        display: flex;
        flex-direction: column;
        .title {
          font-size: 18px;
          color: #11435c;
          position: relative;
        }
        .title::after {
          content: "";
          display: block;
          width: 30px;
          height: 2px;
          position: absolute;
          bottom: -5px;
          left: 0;
          background: #11435c;
          opacity: 0.12;
        }
        .list {
          margin-top: 20px;
          ul {
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            li {
              display: flex;
              align-items: center;
              .icon_box {
                width: 54px;
                height: 54px;
                background: rgba(0, 109, 128, 0.06);
                border-radius: 27px;
                display: flex;
                justify-content: center;
                align-items: center;
                p {
                  width: 20px;
                  height: 20px;
                }
                .icon0 {
                  background: url("../../assets/images/icon0.svg") no-repeat
                    center;
                  background-size: cover;
                }
                .icon1 {
                  background: url("../../assets/images/icon1.svg") no-repeat
                    center;
                  background-size: cover;
                }
                .icon2 {
                  background: url("../../assets/images/icon2.svg") no-repeat
                    center;
                  background-size: cover;
                }
                .icon3 {
                  background: url("../../assets/images/icon3.svg") no-repeat
                    center;
                  background-size: cover;
                }
              }
              .list_right {
                margin-left: 10px;
                .number {
                  color: #000000;
                  font-size: 24px;
                  font-weight: 800;
                }
                .number_bottom {
                  color: #000;
                  opacity: 0.6;
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
      .bottom {
        margin-top: 10px;
        padding: 20px;
        background: #fff;
        .bottom_top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left {
            display: flex;
            align-items: center;
            .title {
              font-size: 18px;
              color: #11435c;
              position: relative;
            }
            .title::after {
              content: "";
              display: block;
              width: 30px;
              height: 2px;
              position: absolute;
              bottom: -5px;
              left: 0;
              background: #11435c;
              opacity: 0.12;
            }
            .sup_title {
              font-size: 14px;
              color: #000;
              opacity: 0.3;
              margin-left: 10px;
              padding-top: 10px;
            }
          }
          .right {
            .ivu-btn-text {
              color: #11435c;
            }
          }
        }
        .bottom_content {
          margin-top: 20px;
          .canvas_box {
            margin-top: 20px;
            .top_canvas {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .left_canvas {
                display: flex;
                align-items: center;
                .name {
                  font-size: 16px;
                  color: #11435c;
                }
                .types {
                  margin-left: 10px;
                  display: flex;
                  align-items: center;
                  p {
                    margin-left: 10px;
                    color: #000;
                    opacity: 0.6;
                    font-size: 14px;
                    cursor: pointer;
                  }
                  .active {
                    color: #11435c;
                    opacity: 1;
                  }
                }
              }
              .right_canvas {
                display: flex;
                align-items: center;
                p {
                  font-size: 14px;
                  margin-left: 20px;
                  position: relative;
                }
                p::before {
                  content: "";
                  width: 8px;
                  height: 8px;
                  position: absolute;
                  left: -10px;
                  bottom: 7px;
                  border-radius: 4px;
                  display: block;
                  background: #00d3c9;
                }
                .first_p::before {
                  background: #a4dc94;
                }
              }
            }
          }
        }
      }
    }
    .right {
      width: 24%;
      display: flex;
      flex-direction: column;

      .right_top {
        background: #fff;
        padding: 20px;
        .title {
          font-size: 18px;
          color: #11435c;
          position: relative;
        }
        .title::after {
          content: "";
          display: block;
          width: 30px;
          height: 2px;
          position: absolute;
          bottom: -5px;
          left: 0;
          background: #11435c;
          opacity: 0.12;
        }
        .sup_title {
          margin-top: 10px;
          color: #000;
          opacity: 0.6;
          font-size: 14px;
        }
        .title_count {
          margin-top: 10px;
          font-size: 14px;
          .title_add {
            color: #000;
            font-weight: 800;
          }
        }
      }
      .right_bottom {
        margin-top: 20px;
        flex: 1;
        .right_progress {
          margin-top: 20px;
          .top {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            p {
              font-size: 14px;
            }
            .top_left {
              color: #000;
              opacity: 0.6;
            }
            .top_percent {
              color: #000;
            }
          }
          .ivu-progress-normal {
            ::v-deep {
              .ivu-progress-outer {
                .ivu-progress-inner {
                  border-radius: 0;
                  .ivu-progress-bg {
                    height: 6px !important;
                    border-radius: 0;
                    background: #006d80;
                  }
                }
              }
            }
          }
          .ivu-progress-active {
            ::v-deep {
              .ivu-progress-outer {
                .ivu-progress-inner {
                  border-radius: 0;
                  .ivu-progress-bg {
                    height: 6px !important;
                    border-radius: 0;
                    background: #00d3c9;
                  }
                }
              }
            }
          }
          .ivu-progress-wrong {
            ::v-deep {
              .ivu-progress-outer {
                .ivu-progress-inner {
                  border-radius: 0;
                  .ivu-progress-bg {
                    height: 6px !important;
                    border-radius: 0;
                    background: #a4dc94;
                  }
                }
              }
            }
          }
          .ivu-progress-success {
            ::v-deep {
              .ivu-progress-outer {
                .ivu-progress-inner {
                  border-radius: 0;
                  .ivu-progress-bg {
                    height: 6px !important;
                    border-radius: 0;
                    background: #ffe898;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
