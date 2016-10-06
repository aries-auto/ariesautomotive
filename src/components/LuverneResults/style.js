module.exports.AnimationStyle = `
.rc-collapse {
  border-radius: 3px;
  border: 1px solid transparent;
}
.rc-collapse-anim-active {
  transition: height 0.2s ease-out;
}
.rc-collapse > .rc-collapse-item {
  border-top: 1px solid transparent;
}
.rc-collapse > .rc-collapse-item:first-child {
  border-top: none;
}
.rc-collapse > .rc-collapse-item > .rc-collapse-header {
  height: 38px;
  line-height: 38px;
  text-indent: 16px;
  cursor: pointer;
}
.rc-collapse > .rc-collapse-item > .rc-collapse-header .arrow {
  display: inline-block;
  content: '\\20';
  width: 0;
  height: 0;
  font-size: 0;
  line-height: 0;
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-left: 4px solid transparent;
  vertical-align: middle;
  margin-right: 8px;
}
.rc-collapse-content {
  overflow: hidden;
  padding: 0 1px;
	margin-bottom:10px;
}
.rc-collapse-content > .rc-collapse-content-box {
  margin-top: 16px;
  margin-bottom: 16px;
}
.rc-collapse-content-inactive {
  display: none;
}
.rc-collapse-item:last-child > .rc-collapse-content {
  border-radius: 0 0 3px 3px;
}
.rc-collapse > .rc-collapse-item-active > .rc-collapse-header .arrow {
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-top: 4px solid transparent;
  margin-right: 6px;
}
`;
