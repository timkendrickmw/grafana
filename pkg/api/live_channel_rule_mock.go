// Code generated by MockGen. DO NOT EDIT.
// Source: github.com/grafana/grafana/pkg/api (interfaces: ChannelRuleStorage)

// Package api is a generated GoMock package.
package api

import (
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
	models "github.com/grafana/grafana/pkg/models"
)

// MockChannelRuleStorage is a mock of ChannelRuleStorage interface.
type MockChannelRuleStorage struct {
	ctrl     *gomock.Controller
	recorder *MockChannelRuleStorageMockRecorder
}

// MockChannelRuleStorageMockRecorder is the mock recorder for MockChannelRuleStorage.
type MockChannelRuleStorageMockRecorder struct {
	mock *MockChannelRuleStorage
}

// NewMockChannelRuleStorage creates a new mock instance.
func NewMockChannelRuleStorage(ctrl *gomock.Controller) *MockChannelRuleStorage {
	mock := &MockChannelRuleStorage{ctrl: ctrl}
	mock.recorder = &MockChannelRuleStorageMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockChannelRuleStorage) EXPECT() *MockChannelRuleStorageMockRecorder {
	return m.recorder
}

// CreateChannelRule mocks base method.
func (m *MockChannelRuleStorage) CreateChannelRule(arg0 models.CreateLiveChannelRuleCommand) (*models.LiveChannelRule, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateChannelRule", arg0)
	ret0, _ := ret[0].(*models.LiveChannelRule)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateChannelRule indicates an expected call of CreateChannelRule.
func (mr *MockChannelRuleStorageMockRecorder) CreateChannelRule(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateChannelRule", reflect.TypeOf((*MockChannelRuleStorage)(nil).CreateChannelRule), arg0)
}

// DeleteChannelRule mocks base method.
func (m *MockChannelRuleStorage) DeleteChannelRule(arg0 models.DeleteLiveChannelRuleCommand) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeleteChannelRule", arg0)
	ret0, _ := ret[0].(error)
	return ret0
}

// DeleteChannelRule indicates an expected call of DeleteChannelRule.
func (mr *MockChannelRuleStorageMockRecorder) DeleteChannelRule(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteChannelRule", reflect.TypeOf((*MockChannelRuleStorage)(nil).DeleteChannelRule), arg0)
}

// GetChannelRule mocks base method.
func (m *MockChannelRuleStorage) GetChannelRule(arg0 models.GetLiveChannelRuleCommand) (*models.LiveChannelRule, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetChannelRule", arg0)
	ret0, _ := ret[0].(*models.LiveChannelRule)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetChannelRule indicates an expected call of GetChannelRule.
func (mr *MockChannelRuleStorageMockRecorder) GetChannelRule(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetChannelRule", reflect.TypeOf((*MockChannelRuleStorage)(nil).GetChannelRule), arg0)
}

// ListChannelRules mocks base method.
func (m *MockChannelRuleStorage) ListChannelRules(arg0 models.ListLiveChannelRuleCommand) ([]*models.LiveChannelRule, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "ListChannelRules", arg0)
	ret0, _ := ret[0].([]*models.LiveChannelRule)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// ListChannelRules indicates an expected call of ListChannelRules.
func (mr *MockChannelRuleStorageMockRecorder) ListChannelRules(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ListChannelRules", reflect.TypeOf((*MockChannelRuleStorage)(nil).ListChannelRules), arg0)
}

// UpdateChannelRule mocks base method.
func (m *MockChannelRuleStorage) UpdateChannelRule(arg0 models.UpdateLiveChannelRuleCommand) (*models.LiveChannelRule, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdateChannelRule", arg0)
	ret0, _ := ret[0].(*models.LiveChannelRule)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// UpdateChannelRule indicates an expected call of UpdateChannelRule.
func (mr *MockChannelRuleStorageMockRecorder) UpdateChannelRule(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateChannelRule", reflect.TypeOf((*MockChannelRuleStorage)(nil).UpdateChannelRule), arg0)
}
